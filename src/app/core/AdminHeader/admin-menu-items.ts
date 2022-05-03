import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type?: string;
  children?: Menu[];
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'Home',
    type: 'sub',
    children: [
      {state: 'version1', name: 'Home Version 1', type: 'link'},
      {state: 'version2', name: 'Home Version 2', type: 'link'}
    ]
  },
  {
    state: 'admin',
    name: 'User Panel',
    type: 'sub',
    children: [
      {state: 'dashboard', name: 'Dashboard', type: 'link'},
      {state: 'messages', name: 'Messages', type: 'link'},
      {state: 'bookmarks', name: 'Bookmarks', type: 'link'},
      {state: 'reviews', name: 'Reviews', type: 'link'},
      {state: 'list', name: 'My Listing', type: 'link'},
      {state: 'add-list', name: 'Add List', type: 'link'},
      {state: 'profile', name: 'Profile', type: 'link'}
    ]
  },
  {
    state: 'pages',
    name: 'Pages',
    type: 'sub',
    children: [
      {state: 'booking', name: 'Booking', type: 'link'},
      {state: 'add-listing', name: 'Add Plan', type: 'link'},
      {state: 'user-profile', name: 'Profile', type: 'link'},
      {
         state: 'blog', 
         name: 'blog', 
         type: 'sub',
         children: [
            {state: 'list', name: 'Plan', type: 'link'},
            {state: 'detail', name: 'Detail', type: 'link'}
          ]
      },
    ]
  }
];


@Injectable()
export class AdminMenuItems {
  getAll() {
    return MENUITEMS;
  }
}
