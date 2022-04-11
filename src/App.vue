<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import NewItem from './components/NewItem.vue'
import TodoList from './components/TodoList.vue'
import { useStore } from './store'
import { ActionTypes } from './store/actions'
import { MutationType } from './store/mutations'
import { state } from './store/state'
export default defineComponent({
  components: { TodoList, NewItem },
  setup() {
    const store = useStore()
    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetTodoItems))
    const completedCount = computed(() => store.getters.completedCount)
    const totalCount = computed(() => store.getters.totalCount)
    const sortBy = (value: string) => {store.commit(MutationType.FilterListBy, value)}
    const clearCompleted = () => {store.dispatch(ActionTypes.DeleteCompleted)}
    return { loading, completedCount, totalCount, sortBy, clearCompleted }
  }
})
</script>

<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-2xl text-center p-2 font-bold">
      Vue 3 Todo App with Typescript and Vuex
    </h1>

    <div v-if="loading">
      <h3 class="text-center mt-4">Loading...</h3>
    </div>
    <div v-else>
      <NewItem />
      <TodoList />
      <div class="flex justify-around	 mt-2">
        <span> {{totalCount - completedCount}} item left. </span>
        <div class="flex justify-around">
          <button class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-4 border border-green-500 hover:border-transparent rounded" @click="sortBy('all')">
              All
          </button>
          <button class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-4 border border-green-500 hover:border-transparent rounded" @click="sortBy('active')">
            Active
          </button>
          <button class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-2 border border-green-500 hover:border-transparent rounded" @click="sortBy('completed')">
            Completed
          </button>
        </div>
        <button class="bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded  disabled:opacity-50" @click="clearCompleted" :disabled="completedCount === 0">
          Clear completed
        </button>
      </div>
    </div>
  </div>
</template>