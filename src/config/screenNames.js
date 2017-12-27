/**
* Import all routes and create object containing routes keys that represent all available screen names
* Screen names are used in whole app for routing
*/

import Routes from '@config/routes';

let obj = {
  ...Routes
};

let screens = {};

Object.keys(obj).forEach((item)=>{
  screens[item] = item;
});

export { screens };
