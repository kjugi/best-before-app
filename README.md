# Best before app

## Live:
https://best-before-app-afb09.firebaseapp.com/

## Important
**Registration is available only by my invite. If you want one, create an issue or host your own firebase app by forking this repo. Also remember to use own API config**

Push notifications available only for:
https://caniuse.com/#feat=push-api

**Info for iOS devices:**

It's unavailable b/c safari doesn't support and as you may know all browsers on iOS basing on safari engine

## What's in this app
- List of products on homepage
- Adding new items
- Deleting items
- Vuex store to keep items
- Validation on inputs
- Notify with success/error message
- Categories of products
- Firebase integration with hosting
- Login and register views
- Compact view and full view on homepage

## Tasks finished:
- Confirm on delete items
- Clearing inputs after adding item
- Checkbox with disabling expire date field from required field to optional
- Firebase fetching data
- Firebase sending data
- Firebase connection and auth
- Fix router
- Update favicon and site title tag
- Fix firebase routing
- Error handling
- Fix mobile styles
- Deploy firebase app with command `firebase deploy` in CI on master branch
- Showing loader and blocking forms when doing action

## TODO:
- Sending notifications about product close to expire, expired products and today expire products
- Release and public (use .env, disable registration, add .indexOn and .validate on firebase console - ref https://firebase.google.com/docs/database/security)
- Disable notify for X days in options
- Edit mode for product list from homepage
- User preferences/settings page like user dashboard after login + saving compact/standard view of items
- Add custom remind time before best before date + custom date for notify
- Add search option
- Add sorting options
- Code review for whole codebase (rewrite styles to reusable, splitting logic and components to separate files and reusing them)
- Add QTY in main form
- Add QTY in edit mode for single product from homepage
- Add option with auto categories selecting for products (translating provided name of product and compare to list)
- Firebase sending images
- Exporting item to other shop/todo app
- NEW page for toiler paper status
- Predefined expiry data for some items i.e. frozen category
