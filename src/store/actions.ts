import { ActionContext, ActionTree} from 'vuex'
import { Mutations, MutationType } from './mutations'
import { state, State } from './state'

export enum ActionTypes {
  GetTodoItems = 'GET_ITEMS',
  DeleteCompleted = 'DELETE_COMPLETED'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.GetTodoItems](context: ActionAugments): void
  [ActionTypes.DeleteCompleted](commit: ActionAugments): void
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoItems]({ commit }) {
    commit(MutationType.SetLoading, true)

    await sleep(1000)

    commit(MutationType.SetLoading, false)
    if (!state.items) {
      commit(MutationType.SetItems, [
        {
          id: 1,
          text: 'Create awesome to-do app!',
          completed: false
        } //Сделать здесь подтяжку из локал
      ])
      commit(MutationType.FilterListBy, state.filterQuery)
    } else {
      commit(MutationType.FilterListBy, state.filterQuery)
    }
  },

  [ActionTypes.DeleteCompleted]({commit}) {
    commit(MutationType.ClearCompleted, undefined)
  }
}
