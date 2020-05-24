# Best before app
> version 0.1.0

## Live:
https://best-before-app-afb09.firebaseapp.com/

## About app
During lockdown we can create pretty much big food suplies - to feel safe and not leaving home for a longer time. Each product contains own 'best before' date and we can't remember all of them that's for sure. With this app you can simply add an product to your list and when date will be close to expire it will remind you by push notify + change status in app.

You are also allowed to categorize products and delete them from list when used. In future should be available a lot more options. They are listed below in TODO section.

Currently I'm using following list of features from firebase:
- Realtime database
- Authentication
- Hosting
- Functions
- Cloud scheduler

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
- Sending notifications about products close to expire
- Release and public

## Start app locally
> DISCLAIMER: Hosting and running app locally requires using firebase and google cloud features. Remember that some of features like using functions and cloud scheduling needs paid as you go billing plan called "Blaze". You should feel warned and aware about it now so don't blame ayone else with that.

1. Requirements to run locally
```
$ node -v
v12.6

$ vue -V
@vue/cli 4.3

$ firebase -V
7.16
```

2. Create project in firebase console for web. If have problems check this instruction: https://firebase.google.com/docs/web/setup. Remember to replace `src/logic/Db.js` config to your own.

3. Create `.env.local` in root directory with following content:
```
VUE_APP_API_KEY=YOUR_API_KEY
```

4. Run following command:
```cli
yarn && yarn serve
```

If everything was created, configured and installed fine you should be able to run app locally on `localhost:8080`. With my credentials to initializing firebase app from repository you are not able to pass this process.

## Deploying app instructions
**Going with this app full public and let everyone to register may generate costs in firebase and you should remember to create some privacy policy for it.**

When you are all setted up on local enviroment, you can use firebase features to public start an app. To do that learn how to deploy to firebase here: https://firebase.google.com/docs/hosting

> Remember that before deploy firebase app to hosting you should build your files in root by `yarn build`, than use `yarn firebase deploy --only hosting`

To deploy functions you should trigger following command - I assume that you are logged and configured.

```
cd functions/ && yarn deploy
```

## Debugging firebase functions
```
cd functions/ && yarn && yarn start
```

Than you can run function by calling their name in console like this

```
>firebase sendNotifications()
```

> Sometimes to proper run functions it's required to command few lines of code and prepare fast data mock in this place.

## TODO:
- Check firebase function and write rules in firebase.console - ref https://firebase.google.com/docs/reference/security/database/#write
- Disable notify for X days in options
- Edit mode for product list from homepage
- User preferences/settings page like user dashboard after login + saving compact/standard view of items
- Add custom remind time before best before date + custom date for notify
- Add search option
- Add sorting options
- Create Google Cloud cron function for auto deleting products 1 month after best before date
- Add flag/option for auto deleting products older than month after best before date
- Code review for whole codebase (rewrite styles to reusable, splitting logic and components to separate files and reusing them)
- Add QTY in main form
- Add QTY in edit mode for single product from homepage
- Add option with auto categories selecting for products (translating provided name of product and compare to list)
- Firebase sending images
- Exporting item to other shop/todo app
- NEW page for toiler paper status
- Predefined expiry data for some items i.e. frozen category
