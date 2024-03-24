import widgets from '@components/widgets';
import type { Schema } from './types';

const schema: Schema = {
	// Collection Name comming from filename

	// Optional & Icon, status, slug
	// See for possible Icons https://icon-sets.iconify.design/
	icon: 'bi:card-text',
	status: 'published',
	slug: 'posts',
	description: 'Posts Collection',
	revision: true,

	// Collection Permissions by user Roles
	// Admin has all permissions by default
	permissions: {
		user: {
			read: true
		},
		editor: {
			create: true,
			read: true
		},
		developer: {
			create: true,
			read: true,
			write: true,
			delete: true
		}
	},

	// Defined Fields that are used in Collection
	// Widget fields can be inspected for individual options
	fields: [
		widgets.Email({
			label: 'Email',
			icon: 'material-symbols:mail'
			// display: async (data, field, entry, contentLanguage) => {
			// 	return data[contentLanguage];
			// },
		}),

		widgets.Text({
			label: 'Test',
			db_fieldName: 'dbtest',
			helper: 'This is the helper text',
			translated: true,
			required: true,
			icon: 'ri:t-box-line',
			placeholder: 'Enter Test Placeholder'
		}),

		widgets.ImageUpload({
			label: 'Image',
			required: true,
			icon: 'material-symbols:image-outline',
			path: 'images' //This save to image folder, and is not globally available
		}),

		widgets.FileUpload({
			label: 'File',
			required: true,
			icon: 'mdi:file-document-outline',
			path: 'global' //This save to image folder, and is not globally available
		})
	]
};
export default schema;
