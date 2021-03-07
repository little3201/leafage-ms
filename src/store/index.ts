import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  user: {
    username: string,
    nickname: string,
    avatar: string
  }
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: {
      username: '',
      nickname: '',
      avatar: ''
    }
  },
  mutations: {
    setUser(state: any, user: object) {
      state.user = user
    },
  }
})

export function useStore() {
  return baseUseStore(key)
}