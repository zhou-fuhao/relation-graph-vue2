<template>
  <div class="app-empty">
    <el-result class="result" title="持续更新中..." subTitle="如果您有更好的想法或建议，请发送至邮箱zhoufuhao@hotmail.com，祝您开心快乐每一天~😊">
      <template slot="icon">
        <el-image class="image" :src="smile"></el-image>
      </template>
    </el-result>
  </div>
</template>

<script>
import smile from '../assets/images/smile.png';
export default {
  name: 'Empty',
  data() {
    return {
      smile
    }
  },
  methods: {},
  created() { }
}
</script>

<style lang="less" scoped>
.app-empty {
  .image {
    width: 72px;
    height: 72px;
  }
}
</style>
