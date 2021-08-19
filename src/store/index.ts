import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  user: Object,
  menus: Array<String>
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    user: new Object(),
    menus: new Array<String>()
  },
  mutations: {
    setUser(state: any, user: object) {
      state.user = user
    },
    setMenus(state: any, menus: Array<String>) {
      state.menus = menus
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}