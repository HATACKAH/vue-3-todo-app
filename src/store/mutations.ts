import { MutationTree } from 'vuex'
import { State, TodoItem } from './state'

export enum MutationType {
  CreateItem = 'CREATE_ITEM',
  SetItems = 'SET_ITEMS',
  CompleteItem = 'COMPLETE_ITEM',
  SetLoading = 'SET_LOADING',
  FilterListBy = 'FILTER_LIST_BY',
  ClearCompleted = 'CLEAR_COMPLETED'
}

export type Mutations = {
  [MutationType.CreateItem](state: State, item: TodoItem): void
  [MutationType.SetItems](state: State, items: TodoItem[]): void
  [MutationType.CompleteItem](
    state: State,
    item: Partial<TodoItem> & { id: number }
  ): void
  [MutationType.SetLoading](state: State, value: boolean): void
  [MutationType.FilterListBy](state: State, filter_query: string): void
  [MutationType.ClearCompleted](state: State): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.CreateItem](state, item) {
    state.items.unshift(item)
    state.editableItems = state.items;
  },
  [MutationType.SetItems](state, items) {
    state.items = items
    state.editableItems = state.items
  },
  [MutationType.CompleteItem](state, newItem) {
    const item = state.items.findIndex(s => s.id === newItem.id)
    if (item === -1) return
    state.items[item] = { ...state.editableItems[item], ...newItem }
    state.editableItems = state.items
  },
  [MutationType.SetLoading](state, value) {
    state.loading = value
  },
  [MutationType.FilterListBy](state, filter_query) {
    let res: TodoItem[] = [];
    const items = state.items;
    switch (filter_query) {
      case "/active":
        res = items.filter(item => {
          return !item.completed;
        })
        break;
      case "/completed":
        res = items.filter(item => {
          return item.completed;
        })
        break;
      case "/all":
        res = items;
        break;
      default:
        res = items
        break
    }
    state.editableItems = [...res];
  },
  [MutationType.ClearCompleted](state) {
    const items = state.items;
    const res = items.filter(item => {return !item.completed})
    state.items = [...res]
    state.editableItems = state.items;
  }
}