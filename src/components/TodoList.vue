<template>
  <TodoItem v-for="item in items" :key="item" v-bind="item" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import TodoItem from './TodoItem.vue'
import { MutationType } from '@/store/mutations'

export default defineComponent({
  components: { TodoItem },
  props:{
    filter: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const items = computed(() => {
      store.commit(MutationType.FilterListBy, props.filter)
      return store.state.editableItems
      })
    return { items }
  }
})
</script>
