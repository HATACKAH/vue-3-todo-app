<template>
  <div class="flex justify-around mt-2">
    <span> {{ totalCount - completedCount }} item left. </span>
    <div class="flex justify-around">
      <button
        class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-4 border border-green-500 hover:border-transparent rounded"
        @click="sortBy('all')"
      > <router-link to="{ name: 'All' }">
        All
        </router-link>
      </button>
      <button
        class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-4 border border-green-500 hover:border-transparent rounded"
        @click="sortBy('active')"
      >
        Active
      </button>
      <button
        class="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white mr-4 px-2 border border-green-500 hover:border-transparent rounded"
        @click="sortBy('completed')"
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
import { store } from '@/store'
import { ActionTypes } from '@/store/actions'
import { MutationType } from '@/store/mutations'
import { computed, defineComponent } from 'vue'

export default defineComponent({
    setup() {
      const clearCompleted = () => {store.dispatch(ActionTypes.DeleteCompleted)}
      const completedCount = computed(() => store.getters.completedCount)
      const sortBy = (value: string) => {store.commit(MutationType.FilterListBy, value)}
      const totalCount = computed(() => store.getters.totalCount)
      return { completedCount, totalCount, sortBy, clearCompleted }
    },
})
</script>

