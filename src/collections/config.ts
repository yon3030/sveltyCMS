// Configure how Collections are sorted & displayed in Categories section.
// This file is generated by the updateConfig API and will be recreated if altered in GUI

export function createCategories(collections: any) {return [
  {
    "name": "Collections",
    "icon": "bi:collection",
    "collections": [
      collections.Names,
      collections.ImageArray,
      collections.Relation,
      collections.WidgetTest
    ]
  },
  {
    "name": "Menu",
    "icon": "bi:menu-button-wide",
    "collections": [
      collections.Menu,
      collections.Posts,
      collections.Posts2,
      collections.Media
    ]
  }
];}
