<template>
  <div class="hello">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsData" :key="index" :label="item.label" :name="item.name">
        <el-button type="text" v-for="(itemChild, itemIndex) in item.childrens" :key="itemIndex"
          @click="onButton(item.label, itemChild.label)">
          {{ itemChild.label }}
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      activeName: 'G6',
      tabsData: [
        {
          label: 'G6', name: 'G6', childrens: [
            { label: 'Demo1', name: 'demo1' },
            // { label: 'demo2', name: 'demo2' },
            // { label: 'demo3', name: 'demo3' },
          ]
        },
        {
          label: 'X6', name: 'X6', childrens: [
            { label: 'Demo1', name: 'demo1' },
            { label: 'Demo2', name: 'demo2' },
            // { label: 'demo3', name: 'demo3' },
          ]
        },
        {
          label: 'Graph', name: 'Graph', childrens: [
            // { label: 'demo1', name: 'demo1' },
            // { label: 'demo2', name: 'demo2' },
            { label: 'Demo3', name: 'demo3' },
          ]
        },
        {
          label: 'JsPlumb', name: 'JsPlumb', childrens: [
            { label: 'Demo1', name: 'demo1' },
            { label: 'Demo2', name: 'demo2' },
            { label: 'Demo3', name: 'demo3' },
            { label: 'Demo4', name: 'demo4' },
          ]
        },
        {
          label: 'Table', name: 'Table', childrens: [
            { label: 'Demo1', name: 'demo1' },
            { label: 'Demo2', name: 'demo2' },
            { label: 'Demo3', name: 'demo3' },
          ]
        },
      ],
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onButton(item, itemChild) {
      this.$router.push(`${item}${itemChild}`)
    }
  }
}
</script>

<style scoped></style>
