<template>
  <TodoItem v-for="item in items" :key="item" v-bind="item" />
</template>

<script lang="ts">
import {useRoute} from 'vue-router'
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import TodoItem from './TodoItem.vue'
import { MutationType } from '@/store/mutations'

export default defineComponent({
  components: { TodoItem },
  setup() {
    const store = useStore()
    const route=useRoute();
    const items = computed(() => {
      store.commit(MutationType.FilterListBy, route.path)
      return store.state.editableItems
      })
    return { items }
  }
})
</script>
