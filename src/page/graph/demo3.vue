<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick"
        :on-line-click="onLineClick" />
    </div>
  </div>
</template>


<script>
import RelationGraph from 'relation-graph';//引入插件
export default {
  name: 'Demo',
  components: { RelationGraph },//注册插件
  data() {
    return {
      //设置插件的参数
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置:http://relation-graph.com/#/docs/graph
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph() {
    //需要指定 节点参数和连接线的参数
      var __graph_json_data = {
        rootId: 'a',
        nodes: [
           // node配置选项：http://relation-graph.com/#/docs/node
           // node支持通过插槽slot完全自定义，示例：http://relation-graph.com/#/demo/adv-slot
          { id: 'a', text: 'A', borderColor: 'yellow' },
          { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
          { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
          { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
           // link配置选项：http://relation-graph.com/#/docs/link
          { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
          { from: 'a', to: 'c', text: '关系2' },
          { from: 'a', to: 'e', text: '关系3' },
          { from: 'b', to: 'e', color: '#67C23A' }
        ]
      }
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed 
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(linkObject, $event) {
      console.log('onLineClick:', linkObject)
    }
  }
}
</script>


<style scoped></style>
