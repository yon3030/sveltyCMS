import fs from 'fs';
import crypto from 'crypto';

// This function compiles TypeScript files from the collections folder into JavaScript files
export async function compile({
	// The default values for the folders are taken from the environment variables
	collectionsFolderJS = import.meta.env.collectionsFolderJS,
	collectionsFolderTS = import.meta.env.collectionsFolderTS
} = {}) {
	// This global variable is used to store the current file name
	globalThis.__filename = '';

	// If the collections folder for JavaScript does not exist, create it
	if (!fs.existsSync(collectionsFolderJS)) {
		fs.mkdirSync(collectionsFolderJS);
	}
	// Import the TypeScript compiler module
	const ts = (await import('typescript')).default;
	// Get the list of TypeScript files from the collections folder, excluding Auth.ts and index.ts
	const files = fs.readdirSync(collectionsFolderTS).filter((file) => !['Auth.ts', 'index.ts'].includes(file));

	// Loop through each file in parallel
	await Promise.all(
		files.map(async (file) => {
			try {
				// const startTime = Date.now(); // Start time measurement (milliseconds)

				const tsFilePath = `${collectionsFolderTS}/${file}`;
				const jsFilePath = `${collectionsFolderJS}/${file.replace(/\.ts$/, '.js')}`;

				// Check if JS file exists and if TS file has been modified since last compile
				if (fs.existsSync(jsFilePath)) {
					const tsStats = fs.statSync(tsFilePath);
					const jsStats = fs.statSync(jsFilePath);

					// Create a hash of the TS file content
					const contentHash = crypto.createHash('md5').update(fs.readFileSync(tsFilePath)).digest('hex');
					// Read the existing JS file and extract the hash
					const existingContent = fs.readFileSync(jsFilePath, { encoding: 'utf-8' });
					const existingHash = existingContent.split('\n')[0].replace('// ', '');

					// Compare hashes and modification times to determine if recompilation is necessary
					if (contentHash === existingHash && tsStats.mtime <= jsStats.mtime) {
						return; // No need to recompile
					}
				}
				// Read the TS file as a string
				const content = fs.readFileSync(tsFilePath, { encoding: 'utf-8' });

				// Transpile the TypeScript code into JavaScript code using the ESNext target
				let code = ts.transpileModule(content, {
					compilerOptions: {
						target: ts.ScriptTarget.ESNext
					}
				}).outputText;

				// Replace the import statements for widgets with an empty string
				code = code
					.replace(/import widgets from .*\n/g, '')
					// Replace the widgets variable with the globalThis.widgets variable
					.replace(/widgets/g, 'globalThis.widgets')
					// Add the .js extension to the relative import paths
					.replace(/(\bfrom\s+["']\..*)(["'])/g, '$1.js$2');

				// Prepend the content hash to the JS file
				const contentHash = crypto.createHash('md5').update(content).digest('hex');
				code = `// ${contentHash}\n${code}`;

				// write the content to the file
				fs.writeFileSync(jsFilePath, code);

				// const endTime = Date.now();
				// const compileTime = (endTime - startTime) / 1000; // Calculate duration in seconds

				// console.log(`Compiled ${file} in ${compileTime.toFixed(3)} seconds`); // Log compile time
			} catch (error) {
				console.error(`Error compiling ${file}: ${error}`);
				// Handle the error appropriately
			}
		})
	);
}
