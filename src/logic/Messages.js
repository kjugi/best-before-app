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
      store.commit(
        'updateMessagingErrorNotify',
        `An unidentified error has occurred - ${err.message}`
      )

      if (err.code === 'messaging/permission-default') {
        store.commit(
          'updateMessagingErrorNotify',
          'You have not enabled notifications on this browser. To enable notifications reload the page and allow notifications using the permission dialog.'
        )
      } else if (err.code === 'messaging/notifications-blocked') {
        store.commit(
          'updateMessagingErrorNotify',
          'You have blocked notifications on this browser. To enable notifications follow these instructions: <a href="https://support.google.com/chrome/answer/114662?visit_id=1-636150657126357237-2267048771&rd=1&co=GENIE.Platform%3DAndroid&oco=1">Android Chrome Instructions</a><a href="https://support.google.com/chrome/answer/6148059">Desktop Chrome Instructions</a>'
        )
      }
    })
}

export function tokenRefresh() {
  if (!messaging) {
    store.commit(
      'updateMessagingErrorNotify',
      'Your browser doesn\'t support Push API'
    )
    return false
  }

  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.')
      saveToken(refreshedToken)
    }).catch(err => {
      store.commit(
        'updateMessagingErrorNotify',
        `Problem during refreshing token for user - ${err.message}`
      )
    })
  })
}

// Requests permission to send notifications on this browser
export function requestPermission() {
  // TODO: Refactor to universal function
  if (!messaging) {
    store.commit(
      'updateMessagingErrorNotify',
      'Your browser doesn\'t support Push API'
    )
    return false
  }

  messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.')
      saveToken(store.getters.getUserUid)
    })
    .catch(error => {
      store.commit(
        'updateMessagingErrorNotify',
        `Problem with getting permissions - ${error.message}`
      )
    })
}

export function onMessage(payload) {
  if (payload.notification) {
    // If notifications are supported on this browser we display one.
    if (window.Notification instanceof Function) {
      new Notification(payload.notification.title, payload.notification);
    }
  }
}
