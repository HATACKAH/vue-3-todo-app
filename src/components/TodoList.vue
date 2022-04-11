<template>
  <TodoItem v-for="item in items" :key="item" v-bind="item" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import TodoItem from './TodoItem.vue'

export default defineComponent({
  components: { TodoItem },
  props:{
    filter: String
  },
  setup(props) {
    console.log(props.filter)
    const store = useStore()
    const items = computed(() => store.state.editableItems)
    return { items }
  }
})
</script>
