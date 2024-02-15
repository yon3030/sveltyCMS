// Create a Global Search Index
import { writable } from 'svelte/store';

// globalSearchIndex
let modalEditAvatar: any;
let modalUserForm: any;
let showUserList: any;
let toggleUserList: any;
let showUsertoken: any;
let toggleUserToken: any;

export const isSearchVisible = writable(false);

// Create a writable store for the global search index
interface SearchData {
	title: string;
	description: string;
	keywords: string[];
	triggers: {
		[title: string]: {
			path: string;
			action?: () => void | Promise<void>; // Can be undefined
		};
	};
}

export const globalSearchIndex = writable<SearchData[]>([
	{
		title: 'Home',
		description: 'The home page of the blog.',
		keywords: ['blog', 'home'],
		triggers: { 'Go to Home Page': { path: '/', action: () => {} } }
	},
	{
		title: 'User Profile',
		description: 'View and edit your user profile.',
		keywords: ['user', 'avatar', 'profile', 'settings', 'account', 'password', 'delete'],
		triggers: {
			'Show User Profile': { path: '/user', action: () => {} },
			'Edit Avatar Image': { path: '/user', action: modalEditAvatar },
			'Change Username & Password': { path: '/user', action: modalUserForm }
		}
	},
	{
		title: 'User Admin Area',
		description: 'View and edit users in the user admin area.',
		keywords: ['user', 'avatar', 'role', 'profile', 'settings', 'account', 'password', 'token'],
		triggers: {
			'Show User List': {
				path: '/user',
				action: () => {
					if (!showUserList) {
						toggleUserList();
					}
				}
			},
			'Show User Token': {
				path: '/user',
				action: () => {
					if (!showUsertoken) {
						toggleUserToken();
					}
				}
			}
		}
	},
	{
		title: 'Collection Builder',
		description: 'Configure your collection.',
		keywords: ['configuration', 'settings', 'system', 'collection', 'category', 'builder'],
		triggers: { 'Go to Collection Builders': { path: '/collection/', action: () => {} } }
	},
	{
		title: 'Builder',
		description: 'Configure your collection.',
		keywords: ['builder'],
		triggers: { 'Go to Builders': { path: '/builder/', action: () => {} } }
	},
	{
		title: 'Media Gallery',
		description: 'View and edit your media gallery.',
		keywords: ['media', 'gallery', 'images', 'videos', 'documents'],
		triggers: {
			'Go to Media Gallery': { path: '/mediagallery', action: () => {} }
		}
	},
	{
		title: 'Image Editor',
		description: 'Edit and manage images with the image editor.',
		keywords: ['image', 'editor', 'edit', 'photos', 'media'],
		triggers: {
			'Go to Image Editor': { path: '/imageEditor', action: () => {} }
		}
	},
	{
		title: 'System Dashboard',
		description: 'View and manage your dashboard.',
		keywords: ['dashboard', 'profile', 'settings', 'load', 'system'],
		triggers: { 'Go to Dashboard': { path: '/dashboard', action: () => {} } }
	},
	{
		title: 'Configuration',
		description: 'Configure the system settings.',
		keywords: ['configuration', 'settings', 'system'],
		triggers: { 'Go to Configuration': { path: '/config/', action: () => {} } }
	}
]);
