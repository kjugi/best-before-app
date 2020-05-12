# Best before app

## Live:
https://best-before-app-afb09.firebaseapp.com/

## What's in this app
- List of products on homepage
- Adding new items
- Deleting items
- Vuex store to keep items
- Validation on inputs
- Notify with success/error message
- Add categories of products
- Firebase integration with hosting
- Login and register views

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
- Add compact view and full view on homepage

## When reach this point we have ready app for presentation. What's TODO later:
- Error handling
- Deploy firebase app with command `firebase deploy` in CI on master barnch
- Sending notifications about product close to expire, expired products and today expire products - use https://github.com/firebase/functions-samples/tree/master/fcm-notifications
- Edit mode for product list from homepage
- User preferences/settings page like user dashboard after login + saving compact/standard view of items
- Add search option
- Add sorting options
- Add QTY in main form
- Add QTY in edit mode for single product from homepage
- Add option with auto categories selecting for products (translating provided name of product and compare to list)
- Firebase sending images
- Exporting item to other shop/todo app
- NEW page for toiler paper status
- Predefined expiry data for some items i.e. frozen category
