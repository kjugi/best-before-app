import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(Vuex)

const db = firebase
  .initializeApp({ databaseURL: 'https://best-before-app-afb09.firebaseio.com/' })
  .database()

export default new Vuex.Store({
  state: {
    products: [],
    categories: [
      'Alcoholic drinks',
      'Baby products',
      'Bakery',
      'Beverages',
      'Canned foods',
      'Car care products',
      'Coffe, tea & hot chocolate',
      'Dairy products',
      'Diet foods',
      'Fish & seafood',
      'Grains & pasta',
      'Home baking',
      'House-cleaning products',
      'Meat, polutry & sausages',
      'Oils',
      'Other',
      'Personal hygiene',
      'Pet supplies',
      'Pharmacy',
      'Preserves',
      'Fruits and vegetables',
      'Ready meals',
      'Snacks',
      'Spieces, sauces & condiments',
      'Frozen'
    ]
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindProducts: firebaseAction(context => {
      return context.bindFirebaseRef(
        'products',
        db.ref('products').orderByChild('createdAt')
      )
    }),
    unbindProducts: firebaseAction(context => {
      return context.unbindFirebaseRef('products')
    }),
    addProduct: firebaseAction((context, data) => {
      // return the promise so we can await the write
      return db.ref('products').push({
        name: data.name,
        expireDate: data.expireDate,
        category: data.category,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
    }),
    deleteProduct: firebaseAction((context, productId) => {
      db.ref('products/' + productId).remove()
    })
  },
  getters: {
  }
})
