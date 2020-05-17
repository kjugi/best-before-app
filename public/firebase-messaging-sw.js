/* eslint-disable */
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA6ClIYD2m8sTIBP2ClityYPXdiw7mBCyg',
  authDomain: 'best-before-app-afb09.firebaseapp.com',
  databaseURL: 'https://best-before-app-afb09.firebaseio.com',
  projectId: 'best-before-app-afb09',
  storageBucket: 'best-before-app-afb09.appspot.com',
  messagingSenderId: '252489393201',
  appId: '1:252489393201:web:8fe1a44017e555e5b3e110',
  measurementId: 'G-55F6PW84FM'
});

const messaging = firebase.messaging();
