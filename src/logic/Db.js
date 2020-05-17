import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/messaging'
import 'firebase/functions'

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyA6ClIYD2m8sTIBP2ClityYPXdiw7mBCyg',
  authDomain: 'best-before-app-afb09.firebaseapp.com',
  databaseURL: 'https://best-before-app-afb09.firebaseio.com',
  projectId: 'best-before-app-afb09',
  storageBucket: 'best-before-app-afb09.appspot.com',
  messagingSenderId: '252489393201',
  appId: '1:252489393201:web:8fe1a44017e555e5b3e110',
  measurementId: 'G-55F6PW84FM'
})

app.analytics()

export const db = app.database()
export const auth = app.auth()
export const functions = app.functions()
export const isMessagingAvailable = firebase.messaging.isSupported()
export const messaging = isMessagingAvailable ? app.messaging() : false
export const currentTime = firebase.database.ServerValue.TIMESTAMP
