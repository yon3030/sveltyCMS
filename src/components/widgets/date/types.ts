import IconifyPicker from '@components/IconifyPicker.svelte';
import Input from '@components/system/inputs/Input2.svelte';
import Toggles from '@components/system/inputs/Toggles.svelte';
import { contentLanguage } from '@stores/store';
import Permissions from '@src/components/Permissions.svelte';
import type { permissions } from '@src/collections/types';

/**
 * Defines Date widget Parameters
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
	permissions?: permissions;

	// Widget Specific parameters
	required?: boolean;
};

/**
 * Defines Date GuiSchema
 */
export const GuiSchema = {
	label: { widget: Input, required: true },
	display: { widget: Input, required: true },
	db_fieldName: { widget: Input, required: true },
	// widget?: any;
	translated: { widget: Toggles, required: false },
	icon: { widget: IconifyPicker, required: false },
	permissions: { widget: Permissions, required: false },

	// Widget Specific parameters
	required: { widget: Toggles, required: false }
};

/**
 * Define Date GraphqlSchema function
 */
export const GraphqlSchema: GraphqlSchema = ({ label, collection }) => {
	// Create a type name by combining the collection name and label
	const typeName = `${collection.name}_${label}`;
	// Initialize an empty string to hold the fields
	let fields = '';
	// Iterate over each language
	for (const lang in contentLanguage) {
		fields += `${lang}: String\n`;
	}

	// Return an object containing the type name and the GraphQL schema
	return {
		typeName,
		graphql: /* GraphQL */ `
        type ${typeName} {
            ${fields}
        }
        `
	};
};
