<template>
  <div id="app">
    <router-view/>
    <!-- <ViewTable /> -->
    <!-- <JsPlumbDemo /> -->
    <!-- <X6Demo /> -->
    <!-- <G6Demo /> -->
  </div>
</template>

<script>
import X6Demo from './page/x6/demo1.vue';
import G6Demo from './page/g6/demo1.vue';
import JsPlumbDemo from './page/jsPlumb/demo1.vue'
import ViewTable from './page/table/demo2.vue'
export default {
  name: 'App',
  components: {
    X6Demo,
    G6Demo,
    JsPlumbDemo,
    ViewTable
  }
}
</script>

<style scoped></style>
