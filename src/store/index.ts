import { createStore } from 'vuex'

const defaultState = {
  firstName: 'Alpha'
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    updateName(state: typeof defaultState, name: string) {
      state.firstName = name
    }
  },
  actions: {
    updateName({commit, state}) {
      commit({
        type: 'updateName',
        payload: state.firstName
      })
    }
  },
  getters: {
    fullName(state: typeof defaultState) {
      const lastName = 'Vue'
      return state.firstName ? `${lastName} ${state.firstName}` : lastName
    }
  }
})
