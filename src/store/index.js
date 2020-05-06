import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db, currentTime } from '../logic/Db.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
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
    ...vuexfireMutations,
    setUser (state, value) {
      state.user = value
    }
  },
  actions: {
    bindProducts: firebaseAction(context => {
      const userId = context.state.user.uid
      return context.bindFirebaseRef(
        'products',
        db.ref(`${userId}/products`).orderByChild('createdAt')
      )
    }),
    unbindProducts: firebaseAction(context => {
      const userId = context.state.user.uid
      return context.unbindFirebaseRef(`${userId}/products`)
    }),
    addProduct: firebaseAction((context, data) => {
      const userId = context.state.user.uid
      return db.ref(`${userId}/products`).push({
        name: data.name,
        expireDate: data.expireDate,
        category: data.category,
        createdAt: currentTime
      })
    }),
    deleteProduct: firebaseAction((context, productId) => {
      const userId = context.state.user.uid
      db.ref(`${userId}/products/${productId}`).remove()
    })
  },
  getters: {
    isUserLogged (state) {
      return !!state.user
    }
  }
})
