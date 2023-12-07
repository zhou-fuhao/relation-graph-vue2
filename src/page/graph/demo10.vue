<template>
  <div v-loading="g_loading">
    <div style="height:88vh;">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick"
        :on-line-click="onLineClick" :on-node-expand="onNodeExpand">
        <template #node="{ node }">
          <div v-if="node.id === 'a'" style="width: 400px;background-color: #bbbbbb">
            <!---------------- if node a ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <td>
                  <div id="a-r2-c2">
                    a-r1-c1
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div id="a-r3-c2">a-r2-c1</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div id="a-r4-c2">a-r3-c1</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="node.id === 'b'" style="background-color: #bbbbbb;width: 300px;">
            <!---------------- if node b ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>
                  <div id="b-r1-c3">b-r1-c1</div>
                </th>
              </tr>
              <tr>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>
                  <div id="b-r4-c3">b-r1-c4</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="node.id === 'c'" style="background-color: #bbbbbb;width: 300px;">
            <!---------------- if node c ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>
                  <div id="c-r1-c1">c-r1-c1</div>
                </th>
              </tr>
              <tr>
                <th>
                  <div id="c-r2-c1">c-r1-c2</div>
                </th>
              </tr>
              <tr>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>
                  <div id="c-r4-c1">c-r1-c4</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="node.id === 'b1'" style="background-color: #bbbbbb;width: 300px;">
            <!---------------- if node d ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>
                  <div id="d-r1-c1">d-r1-c1</div>
                </th>
              </tr>
              <tr>
                <td>
                  <div id="d-r2-c1">d-r1-c2</div>
                </td>
              </tr>
              <tr>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>xxxx</td>
              </tr>
            </table>
          </div>
          <div v-else class="rg-center-items" style="height: 100%;"><!---------------- if other nodes ---------------->
            <div style="width: 100%;">{{ node.text }}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelationGraphDemo10',
  components: {},
  data() {
    return {
      g_loading: false,
      isShowCodePanel: false,
      graphOptions: {
        allowSwitchLineShape: true,
        isMoveByParentNode: true,
        disableLineClickEffect: true,
        layouts: [
          // {
          //   label: '布局1',
          //   layoutName: 'center',
          //   layoutClassName: 'seeks-layout-center',
          //   useLayoutStyleOptions: true,
          //   defaultNodeWidth: '50',
          //   defaultNodeHeight: '50',
          //   defaultNodeBorderWidth: 0,
          //   defaultNodeColor: 'rgba(238, 178, 94, 1)',
          //   defaultLineShape: 1
          // },
          {
            label: '布局2',
            layoutName: 'tree', // 布局方式（tree树状布局/center中心布局/force自动布局）
            layoutClassName: 'seeks-layout-center', // 当使用这个布局时，会将此样式添加到图谱上,这里就是设置我们自定义的样式
            useLayoutStyleOptions: true,
            from: 'top',
            defaultNodeWidth: '30',
            defaultNodeHeight: '100',
            defaultJunctionPoint: 'tb',
            defaultNodeShape: 1,
            defaultLineShape: 4,
            defaultNodeBorderWidth: 0,
            defaultLineColor: 'rgba(0, 186, 189, 1)',
            defaultNodeColor: 'rgba(0, 206, 209, 1)',
            // min_per_width: 40, // 节点距离限制:节点之间横向距离最小值
            // max_per_width: 70, // 节点距离限制:节点之间横向距离最大值
            // min_per_height: 200, // 节点距离限制:节点之间纵向距离最小值
            // max_per_height: 200, // 节点距离限制:节点之间纵向距离最大值
          },
          // {
          //   label: '布局3',
          //   layoutName: 'tree',
          //   layoutClassName: 'seeks-layout-center',
          //   useLayoutStyleOptions: true,
          //   hideNodeContentByZoom: true,
          //   from: 'left',
          //   defaultNodeWidth: '100',
          //   defaultNodeHeight: '30',
          //   defaultJunctionPoint: 'lr',
          //   defaultNodeShape: 1,
          //   defaultLineShape: 6,
          //   defaultNodeBorderWidth: 0,
          //   defaultLineColor: '#c0c0c0',
          //   defaultNodeColor: '#ffa00b',
          //   min_per_width: 200,
          //   max_per_width: 400,
          //   min_per_height: 40,
          //   max_per_height: 70,
          //   defaultExpandHolderPosition: 'right',
          //   defaultLineWidth: 3
          // }
        ],
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a' },
          { 'id': 'b', 'text': 'b-固定数据展开/关闭' },
          { 'id': 'b1', 'text': 'b1' },
          { 'id': 'b1-1', 'text': 'b1-1' },
          { 'id': 'b1-2', 'text': 'b1-2' },
          { 'id': 'b1-3', 'text': 'b1-3' },
          { 'id': 'b1-4', 'text': 'b1-4' },
          { 'id': 'b1-5', 'text': 'b1-5' },
          { 'id': 'b1-6', 'text': 'b1-6' },
          { 'id': 'b2', 'text': 'b2' },
          { 'id': 'b2-1', 'text': 'b2-1' },
          { 'id': 'b2-2', 'text': 'b2-2' },
          { 'id': 'c', 'text': 'c-动态数据展开/关闭' },
          { 'id': 'c1', 'text': 'c1-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } },
          { 'id': 'c2', 'text': 'c2-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } },
          { 'id': 'c3', 'text': 'c3-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } }],
        'lines': [
          { 'from': 'a', 'to': 'b' },
          { 'from': 'b', 'to': 'b1' },
          { 'from': 'b1', 'to': 'b1-1' },
          { 'from': 'b1', 'to': 'b1-2' },
          { 'from': 'b1', 'to': 'b1-3' },
          { 'from': 'b1', 'to': 'b1-4' },
          { 'from': 'b1', 'to': 'b1-5' },
          { 'from': 'b1', 'to': 'b1-6' },
          { 'from': 'b', 'to': 'b2' },
          { 'from': 'b2', 'to': 'b2-1' },
          { 'from': 'b2', 'to': 'b2-2' },
          { 'from': 'a', 'to': 'c' },
          { 'from': 'c', 'to': 'c1' },
          { 'from': 'c', 'to': 'c2' },
          { 'from': 'c', 'to': 'c3' }]
      }
      // const __graph_json_data = test
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        // console.log(this.$refs.seeksRelationGraph.getInstance().getLinks())
      });
    },

    // 点击节点事件
    onNodeClick(nodeObject, $event) {
      const allLinks = this.$refs.seeksRelationGraph.getLinks();
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          line.color = "#c0c0c0";
          line.lineWidth = 3;
        });
      });

      let fromNodeList = [];
      let toNodeList = [];
      this.getFromNode(allLinks, nodeObject, fromNodeList);
      this.getToNode(allLinks, nodeObject, toNodeList);

      toNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          link.relations.forEach(line => {
            line.color = "#ffa00b";
            line.lineWidth = 5;
          });
        });
      });
      fromNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          console.log(link.fromNode)
          link.relations.forEach(line => {
            line.color = "#ffa00b";
            line.lineWidth = 5;
          });
        });
      });
      // // 有时候更改一些属性后，并不能马上同步到视图，这需要以下方法让视图强制根据数据同步到最新
      this.$refs.seeksRelationGraph.getInstance().dataUpdated();
    },

    getFromNode(allLinks, node, fromNodeList) {
      let linkList = allLinks.filter(link => (link.toNode === node));
      if (linkList.length > 0) {
        linkList.forEach(link => {
          fromNodeList.push({ fromNode: link.fromNode, toNode: node });
          this.getFromNode(allLinks, link.fromNode, fromNodeList);
        })
      }
    },

    getToNode(allLinks, node, toNodeList) {
      let linkList = allLinks.filter(link => (link.fromNode === node));
      if (linkList.length > 0) {
        linkList.forEach(link => {
          toNodeList.push({ fromNode: node, toNode: link.toNode });
          this.getToNode(allLinks, link.toNode, toNodeList);
        })
      }
    },

    // 点击线条事件
    onLineClick(lineObject, linkObject, $event) {
      const allLinks = this.$refs.seeksRelationGraph.getLinks();
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          line.color = "#c0c0c0";
          line.lineWidth = 3;
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
            line.lineWidth = 5;
          });
        });
      })
      fromNodeList.forEach(item => {
        allLinks.filter(link => (link.fromNode === item.fromNode && link.toNode === item.toNode)).forEach(link => {
          console.log(link.fromNode)
          link.relations.forEach(line => {
            line.color = "#ffa00b"
            line.lineWidth = 5;
          });
        });
      })
      this.$refs.seeksRelationGraph.getInstance().dataUpdated();
    },

    // 展开节点事件
    onNodeExpand(node, e) {
      console.log('onNodeExpand:', node);
      // 根据具体的业务需要决定是否需要从后台加载数据
      if (!node.data.isNeedLoadDataFromRemoteServer) {
        console.log('这个节点的子节点已经加载过了');
        // this.$refs.seeksRelationGraph.refresh();
        return;
      }
      // 判断是否已经动态加载数据了
      if (node.data.childrenLoaded) {
        console.log('这个节点的子节点已经加载过了');
        // this.$refs.seeksRelationGraph.refresh();
        return;
      }
      this.g_loading = true;
      node.data.childrenLoaded = true;
      this.loadChildNodesFromRemoteServer(node, new_data => {
        this.g_loading = false;
        this.$refs.seeksRelationGraph.getInstance().appendJsonData(new_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        });
      });
    },

    loadChildNodesFromRemoteServer(node, callback) {
      setTimeout(function () {
        const _new_json_data = {
          nodes: [
            { id: node.id + '-child-1', text: node.id + '-的动态子节点1', width: 150 },
            { id: node.id + '-child-2', text: node.id + '-的动态子节点2', width: 150 },
            { id: node.id + '-child-3', text: node.id + '-的动态子节点3', width: 150 }
          ],
          lines: [
            { from: node.id, to: node.id + '-child-1' },
            { from: node.id, to: node.id + '-child-2' },
            { from: node.id, to: node.id + '-child-3' }
          ]
        };
        callback(_new_json_data);
      }, 1000);
    },
  }
};
</script>

<style scoped>
::v-deep .rel-node-shape-1 {
  overflow: hidden;
}

.c-data-table {
  background-color: #ffffff;
  border-collapse: collapse;
  width: 100%;
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
</style>