const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Showing push by firebase functions
// TODO: WIP of sending notification when close to expire date.
// Must combine it with cron job: https://github.com/firebase/functions-samples/tree/master/delete-unused-accounts-cron
exports.sendNotifications = functions.database.ref('/{uid}/products')
  .onWrite(async (change, context) => {
    // Get the list of device notification tokens.
    const getDeviceTokensPromise = await admin.database()
        .ref(`tokens/${context.params.uid}/notificationTokens`)
        .once('value')

    // Check if there are any device tokens.
    if (!getDeviceTokensPromise.hasChildren()) {
      return console.log('There are no notification tokens to send to.')
    }
    console.log('There are', getDeviceTokensPromise.numChildren(), 'tokens to send notifications to.')

    // Notification details.
    // TODO: Add real body
    const payload = {
      notification: {
        title: 'You added a product',
        body: 'custom body'
      }
    }

    // Listing all tokens as an array.
    let tokens = Object.keys(getDeviceTokensPromise.val())

    // Send notifications to all tokens.
    const response = await admin.messaging().sendToDevice(tokens, payload)

    // For each message check if there was an error.
    const tokensToRemove = []

    response.results.forEach((result, index) => {
      const error = result.error

      if (error) {
        console.error('Failure sending notification to', tokens[index], error)

        // Cleanup the tokens who are not registered anymore.
        if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered'
        ) {
          tokensToRemove.push(getDeviceTokensPromise.ref.child(tokens[index]).remove())
        }
      }
    })

    return Promise.all(tokensToRemove)
  })

// TODO: Delete products with +1 month after best before date for users as a cron job
