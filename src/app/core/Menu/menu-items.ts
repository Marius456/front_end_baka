import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type?: string;
  children?: Menu[];
}

const MENUITEMS = [
  {
    state: 'plans',
    name: 'Plans',
    type: 'link'
  },
   {
    state: 'admin',
    name: 'User Panel',
    type: 'sub',
    children: [
      {state: 'dashboard', name: 'Dashboard', type: 'link'},
      {state: 'messages', name: 'Messages', type: 'link'},
      {state: 'reviews', name: 'Reviews', type: 'link'},
      {state: 'bookmarks', name: 'Bookmarks', type: 'link'},
      {state: 'plans', name: 'My Plans', type: 'link'}
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll() {
    return MENUITEMS;
  }
}
