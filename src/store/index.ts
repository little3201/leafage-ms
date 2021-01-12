import { createStore } from 'vuex'

export default createStore({
  state: {
    names: []
  },
  mutations: {
    addNames(state: any, name: string) {
      state.taskList.push(name)
    },
    removeNames(state: any, index: number) {
      state.taskList.splice(index, 1)
    },
    modifyNames(state: any, payload: any) {
      const { index, status } = payload

      state.names[index].isfinished = status
    }
  },
  actions: {
  },
  modules: {
  }
})