<template>
  <el-container class="app-home">
    <el-aside class="app-home-aside" width="220px">
      <el-menu :router="true" :unique-opened="true" background-color="#001529" text-color="#ffffffa6"
        active-text-color="#fff">
        <el-submenu :index="item.id" :key="item.id" v-for="(item) in menuData">
          <template slot="title">
            <i :class="item.icon"></i>
            {{ item.label }}
          </template>
          <el-menu-item :index="`${item.label}${itemChild.label}`" v-for="(itemChild, itemIndex) in item.childrens"
            :key="itemIndex">
            {{ itemChild.label }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import lodash from 'lodash';

let childrens = [];
for (let i = 0; i < 10; i++) {
  childrens.push(
    { label: `Demo${i + 1}`, name: `demo${i + 1}` },
  )
}
export default {
  name: 'Home',
  data() {
    return {
      menuData: [],
      arr: [
        { id: '1', icon: 'el-icon-lollipop', label: 'Graph', name: 'Graph', },
        { id: '2', icon: 'el-icon-ice-cream-round', label: 'G6', name: 'G6', },
        { id: '3', icon: 'el-icon-ice-cream-square', label: 'X6', name: 'X6', },
        { id: '4', icon: 'el-icon-potato-strips', label: 'JsPlumb', name: 'JsPlumb', },
        { id: '5', icon: 'el-icon-milk-tea', label: 'Table', name: 'Table', },
      ]
    }
  },
  methods: {},
  created() {
    this.menuData = lodash.map(this.arr, item => {
      return {
        ...item, childrens
      }
    })
  }
}
</script>

<style lang="less" scoped>
.app-home {
  height: calc(100vh - 20px);
  border: 1px solid #eee;

  &-aside {
    background-color: #001529;
  }

  &-aside::-webkit-scrollbar {
    width: 4px;
  }

  &-aside::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  &-aside::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
