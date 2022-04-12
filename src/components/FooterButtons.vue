<template>
  <div class="flex justify-around mt-2">
    <span> {{ totalCount - completedCount }} item left. </span>
    <div class="flex justify-around">
      <button
        class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-4 border border-green-500 hover:border-transparent rounded"
        @click="goToPage('all')"
      >
        All
      </button>
      <button
        class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-4 border border-green-500 hover:border-transparent rounded"
        @click="goToPage('active')"
      >
        Active
      </button>
      <button
        class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-2 border border-green-500 hover:border-transparent rounded"
        @click="goToPage('completed')"
      >
        Completed
      </button>
    </div>
    <button
      class="bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded disabled:opacity-50"
      @click="clearCompleted"
      :disabled="completedCount === 0"
    >
      Clear completed
    </button>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { store } from '@/store'
import { ActionTypes } from '@/store/actions'
import { computed, defineComponent } from 'vue'

export default defineComponent({
    setup() {
      const clearCompleted = () => {store.dispatch(ActionTypes.DeleteCompleted)}
      const completedCount = computed(() => store.getters.completedCount)
      const goToPage = (value: string) => {router.push(value)}
      const totalCount = computed(() => store.getters.totalCount)
      return { completedCount, totalCount, goToPage, clearCompleted }
    },
})
</script>

