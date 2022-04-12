<template>
  <div class="container mx-auto mt-4">
    <router-view></router-view>
    <div v-if="loading">
      <h3 class="text-center mt-4">Loading...</h3>
    </div>
    <div v-else>
      <NewItem />
      <TodoList :filter="route.path" />
      <FooterButtons />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FooterButtons from './components/FooterButtons.vue'
import NewItem from './components/NewItem.vue'
import TodoList from './components/TodoList.vue'
import { useStore } from './store'
import { ActionTypes } from './store/actions'

export default defineComponent({
  components: { TodoList, NewItem, FooterButtons },
  setup() {
    const route = useRoute();
    const store = useStore()
    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetTodoItems))
    return { loading, route }
  }
})
</script>