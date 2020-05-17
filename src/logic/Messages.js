import { db, messaging } from './Db.js'
import store from '../store/index.js'

// Saves the token to the database if available. If not request permissions
export function saveToken(userId) {
  messaging.getToken()
    .then(currentToken => {
      if (currentToken) {
        db.ref(`tokens/${userId}/notificationTokens/${currentToken}`).set(true)
      } else {
        requestPermission()
      }
    })
    .catch(err => {
      // TODO: Show this info in notify
      let notifyMessage = 'An unidentified error has occurred'
      console.error('Unable to get messaging token.', err)

      if (err.code === 'messaging/permission-default') {
        notifyMessage = 'You have not enabled notifications on this browser. To enable notifications reload the page and allow notifications using the permission dialog.'
      } else if (err.code === 'messaging/notifications-blocked') {
        notifyMessage = 'You have blocked notifications on this browser. To enable notifications follow these instructions: <a href="https://support.google.com/chrome/answer/114662?visit_id=1-636150657126357237-2267048771&rd=1&co=GENIE.Platform%3DAndroid&oco=1">Android Chrome Instructions</a><a href="https://support.google.com/chrome/answer/6148059">Desktop Chrome Instructions</a>'
      }

      console.log(notifyMessage)
    })
}

export function tokenRefresh() {
  // TODO: Do some fallback for this usesr with info or something
  if (!messaging || !store.state.user) {
    return false
  }

  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.')
      // Send Instance ID token to app server
      saveToken(refreshedToken)
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err)
    })
  })
}

// Requests permission to send notifications on this browser
export function requestPermission() {
  // TODO: Do some fallback for this usesr with info or something
  if (!messaging || !store.state.user) {
    return false
  }

  messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.')
      saveToken(store.getters.getUserUid)
    })
    .catch(error => {
      console.error('Unable to get permission to notify.', error)
    })
}

export function onMessage(payload) {
  console.log('Notifications received.', payload);

  if (payload.notification) {
    // If notifications are supported on this browser we display one.
    if (window.Notification instanceof Function) {
      new Notification(payload.notification.title, payload.notification);
    }
  }
}
