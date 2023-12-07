<template>
  <div class="app-graph-demo1">
    <el-row :gutter="20">
      <el-col :span="8">
        <div>1.点击可显示血缘关系线</div>
      </el-col>
      <el-col :span="8">
        <div>2.右键自定义菜单</div>
      </el-col>
      <el-col :span="8">
        <div>3.点击➕动态加载数据</div>
      </el-col>
    </el-row>
    <div v-loading="g_loading" class="graph" @click="isShowNodeMenuPanel = false">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-expand="onNodeExpand"
        :on-node-collapse="onNodeCollapse" :on-node-click="onNodeClick" :on-line-click="onLineClick">
        <template #node="{ node }">
          <div class="c-table-header">
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr ref="rowOne">
                <td @contextmenu.prevent.stop="showNodeMenus(node, $event)">
                  <div id="a-r2-c2">
                    {{ node.text.slice(0, 2) }}-r1-c1
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </template>
      </RelationGraph>
    </div>
    <div v-show="isShowNodeMenuPanel" class="show-node-menu-panel"
      :style="{ left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }">
      <div class="show-node-menu-panel-modal"> 对这个节点进行操作：</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作1</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作2')">操作2</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作3')">操作3</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作4')">操作4</div>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'RelationGraphDemo9',
  components: {},
  data() {
    return {
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      g_loading: true,
      graphOptions: {
        layouts: [
          {
            label: '中心',
            layoutName: 'tree',
            layoutClassName: 'seeks-layout-center',
            defaultJunctionPoint: 'border',
            defaultNodeShape: 0,
            defaultLineShape: 1,
            from: 'left',
            max_per_width: '300',
            min_per_height: '40'
          }
        ],
        defaultLineMarker: {
          markerWidth: 12,
          markerHeight: 12,
          refX: 6,
          refY: 6,
          data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        moveToCenterWhenRefresh: false,
        defaultExpandHolderPosition: 'right',
        defaultNodeShape: 1,
        // defaultNodeWidth: '100%', // 不写默认为px
        defaultLineShape: 4,
        defaultJunctionPoint: 'lr',
        defaultNodeBorderWidth: 0,
        defaultLineColor: 'rgba(0, 186, 189, 1)',
        defaultNodeColor: 'rgba(0, 206, 209, 1)'
      }
    };
  },
  created() { },
  mounted() {
    this.setGraphData();
  },
  methods: {
    setGraphData() {
      // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
      // 通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a' },
          { 'id': 'b', 'text': 'b -固定数据展开/关闭' },
          { 'id': 'b2', 'text': 'b2' },
          { 'id': 'b2-1', 'text': 'b2-1' },
          { 'id': 'b2-2', 'text': 'b2-2' },
          { 'id': 'c', 'text': 'c -动态数据展开/关闭' },
          { 'id': 'c1', 'text': 'c1-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } },
        ],
        'lines': [
          { 'from': 'a', 'to': 'b' },
          { 'from': 'b', 'to': 'b2' },
          { 'from': 'b2', 'to': 'b2-1' },
          { 'from': 'b2', 'to': 'b2-2' },
          { 'from': 'a', 'to': 'c' },
          { 'from': 'c', 'to': 'c1' },
        ]
      };

      // console.log(JSON.stringify(__graph_json_data));
      setTimeout(() => {
        this.g_loading = false;
        this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        });
      }, 1000);
    },
    onNodeCollapse(node, e) {
      this.$refs.graphRef.refresh();
    },
    // 通过onNodeExpand事件监听节点的展开事件，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
    onNodeExpand(node, e) {
      console.log('onNodeExpand:', node);
      // 根据具体的业务需要决定是否需要从后台加载数据
      if (!node.data.isNeedLoadDataFromRemoteServer) {
        console.log('这个节点的子节点已经加载过了');
        this.$refs.graphRef.refresh();
        return;
      }
      // 判断是否已经动态加载数据了
      if (node.data.childrenLoaded) {
        console.log('这个节点的子节点已经加载过了');
        this.$refs.graphRef.refresh();
        return;
      }
      this.g_loading = true;
      node.data.childrenLoaded = true;
      this.loadChildNodesFromRemoteServer(node, new_data => {
        this.g_loading = false;
        this.$refs.graphRef.getInstance().appendJsonData(new_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        });
      });
    },
    loadChildNodesFromRemoteServer(node, callback) {
      setTimeout(function () {
        const _new_json_data = {
          nodes: [
            { id: node.id + '-child-1', text: node.id + '-的动态子节点1', width: 150 },
          ],
          lines: [
            { from: node.id, to: node.id + '-child-1', text: '动态子节点' },
          ]
        };
        callback(_new_json_data);
      }, 1000);
    },

    // 点击节点事件
    onNodeClick(nodeObject, $event) {
      const allLinks = this.$refs.graphRef.getLinks();
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          line.color = "#00CED1";
        });
      });

      let fromNodeList = [];
      let toNodeList = [];
      this.getFromNode(allLinks, nodeObject, fromNodeList);
      this.getToNode(allLinks, nodeObject, toNodeList);

      toNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          link.relations.forEach(line => {
            line.color = "#ffa00b"
          });
        });
      });
      fromNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          link.relations.forEach(line => {
            line.color = "#ffa00b"
          });
        });
      });
      // // 有时候更改一些属性后，并不能马上同步到视图，这需要以下方法让视图强制根据数据同步到最新
      this.$refs.graphRef.getInstance().dataUpdated();
    },

    getFromNode(allLinks, node, fromNodeList) {
      let linkList = allLinks.filter(link => (link.toNode === node))
      if (linkList.length > 0) {
        linkList.forEach(link => {
          fromNodeList.push({ fromNode: link.fromNode, toNode: node })
          this.getFromNode(allLinks, link.fromNode, fromNodeList)
        })
      }
    },

    getToNode(allLinks, node, toNodeList) {
      let linkList = allLinks.filter(link => (link.fromNode === node))
      if (linkList.length > 0) {
        linkList.forEach(link => {
          toNodeList.push({ fromNode: node, toNode: link.toNode })
          this.getToNode(allLinks, link.toNode, toNodeList)
        })
      }
    },

    // 点击线条事件
    onLineClick(lineObject, linkObject, $event) {
      const allLinks = this.$refs.graphRef.getLinks();
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          line.color = "#00CED1";
        });
      });

      let fromNodeList = [];
      let toNodeList = [];
      this.getFromNode(allLinks, linkObject.fromNode, fromNodeList);
      this.getToNode(allLinks, linkObject.toNode, toNodeList);
      toNodeList.push({ fromNode: linkObject.fromNode, toNode: linkObject.toNode });

      toNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          link.relations.forEach(line => {
            line.color = "#ffa00b";
          });
        });
      })
      fromNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          console.log(link.fromNode)
          link.relations.forEach(line => {
            line.color = "#ffa00b";
          });
        });
      })
      this.$refs.graphRef.getInstance().dataUpdated();
    },

    showNodeMenus(nodeObject, $event) {
      this.currentNode = nodeObject;
      this.isShowNodeMenuPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX;
      this.nodeMenuPanelPosition.y = $event.clientY;
    },

    doAction(value) {
      this.$message({
        message: '对节点【' + this.currentNode.text + '】进行了：' + value,
        type: 'success'
      });
      this.isShowNodeMenuPanel = false;
    }
  }
};
</script>

<style lang="less" scoped>
.app-graph-demo1 {
  .graph {
    width: 100%;
    height: 85vh;
  }
}

::v-deep .rel-node-shape-1 {
  overflow: hidden;
}

.c-data-table {
  background-color: #ffffff;
  border-collapse: collapse;
  width: 100%;
}

.c-table-header {
  width: 100%;
  background-color: #bbbbbb;
}

.c-table-title {
  color: #333333;
}

.c-data-table td,
.c-data-table th {
  border: 1px solid #bbbbbb;
  color: #333333;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
}

.c-data-table td div,
.c-data-table th div {
  background-color: #1da9f5;
  color: #ffffff;
  border-radius: 5px;
}

.show-node-menu-panel {
  z-index: 999;
  padding: 10px;
  background-color: #ffffff;
  border: #eeeeee solid 1px;
  box-shadow: 0px 0px 8px #cccccc;
  position: absolute;
}

.show-node-menu-panel-modal {
  line-height: 25px;
  padding-left: 10px;
  color: #888888;
  font-size: 12px;
}
</style>
