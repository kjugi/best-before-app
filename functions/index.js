const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.sendNotifications = functions.pubsub.schedule('every day 00:00')
  .timeZone('Europe/Warsaw')
  .onRun(async () => {
    const userIds = await getUserIds()
    const usersLeft = await getUsersToNotify(userIds)

    const filteredUsers = usersLeft.filter(el => {
      return el != null;
    })

    filteredUsers.forEach(async item => {
      await sendNotification(item)
    })

    console.log('Job done')
  })

async function getUsersToNotify (userArray) {
  return await Promise.all(userArray.map(async oneUser => {
    const result = await admin.database()
      .ref(`/${oneUser}/products`)
      .once('value')

    if (result.hasChildren()) {
      const elements = Object.values(result.val())

      const getOutdatedProducts = elements.filter(item => {
        const varForDate = new Date()
        const futureDate = varForDate.setTime(
          varForDate.getTime() + (14 * 24 * 60 * 60 * 1000)
        )

        return new Date(item.expireDate).getTime() < futureDate
      })


      if (getOutdatedProducts.length > 0) {
        return oneUser
      }
    }
  }))
}

async function getUserIds (users = [], nextPageToken) {
  const result = await admin.auth().listUsers(1000, nextPageToken)
  const uids = result.users.map(user => user.uid)

  // Concat with list of previously found inactive users if there was more than 1000 users.
  users = users.concat(uids)

  // If there are more users to fetch we fetch them.
  if (result.pageToken) {
    return getUserIds(users, result.pageToken)
  }

  return users
}

// Showing push by firebase functions
async function sendNotification(uid) {
  // TODO: Checking for flag is notifications disabled by user or we can send one
  // Get the list of device notification tokens.
  const getDeviceTokensPromise = await admin.database()
      .ref(`tokens/${uid}/notificationTokens`)
      .once('value')

  // Check if there are any device tokens.
  if (!getDeviceTokensPromise.hasChildren()) {
    return console.log('There are no notification tokens to send to.')
  }
  console.log('There are', getDeviceTokensPromise.numChildren(), 'tokens to send notifications to.')

  // Notification details.
  const payload = {
    notification: {
      title: 'Action required in Best Before App',
      body: 'Some of your products is close to expire date. You should check it',
      icon: '/icon.png'
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
}

// TODO: Delete products with +1 month after best before date for users as a cron job
