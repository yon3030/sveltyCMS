import IconifyPicker from '@components/IconifyPicker.svelte';
import Input from '@components/system/inputs/Input2.svelte';
import Toggles from '@components/system/inputs/Toggles.svelte';

import { SIZES } from '@utils/utils';

/**
 * Defines ImageUpload widget Parameters
 */
export type Params = {
	// default required parameters
	label: string;
	display?: DISPLAY;
	db_fieldName?: string;
	widget?: any;
	translated?: boolean;
	icon?: string;
	helper?: string;
	width?: number;

	// Widget Specific parameters
	// path: (string & {}) | 'global' | 'unique';
	path: string | 'global' | 'unique';
	required?: boolean;
};

/**
 * Defines ImageUpload GuiSchema
 */
export const GuiSchema = {
	label: { widget: Input, required: true },
	db_fieldName: { widget: Input, required: true },
	icon: { widget: IconifyPicker, required: false },
	display: { widget: Input, required: true },
	// widget?: any;
	//translated: { widget: Toggles, required: false },

	// Widget Specific parameters
	path: { widget: Input, required: false },
	required: { widget: Toggles, required: false }
};

const types = Object.keys(SIZES)
	.map(
		(size) =>
			`type ${size} {
	name: String
	url: String
	size: Int
	type: String
	lastModified: Float
}`
	)
	.join('\n');

/**
 * Define ImageUpload GraphqlSchema function
 */
export const GraphqlSchema: GraphqlSchema = ({ label, collection }) => {
	// Create a type name by combining the collection name and label
	const typeName = `${collection.name}_${label}`;
	console.log(typeName);

	// Return an object containing the type name and the GraphQL schema
	return {
		typeName,
		graphql: /* GraphQL */ `
		${types}
		type ${typeName} {
			${Object.keys(SIZES)
				.map((size) => `${size}: ${size}`)
				.join('\n')}
		}
	`
	};
};
