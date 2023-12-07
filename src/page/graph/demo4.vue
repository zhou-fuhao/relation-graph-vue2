<template>
  <div>
    <div style="height:88vh;">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick">
        <template #canvas-plug>
          <!--- 可以将一些不允许被拖动的元素放在这里 --->
        </template>
        <template #node="{ node }">
          <div v-if="node.id === 'a'" style="width: 300px;background-color: #bbbbbb">
            <!---------------- if node a ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>列1</th>
                <th>列2</th>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>
                  <div id="a-r2-c2">a-r2-c2</div>
                </td>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>
                  <div id="a-r3-c2">a-r3-c2</div>
                </td>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>
                  <div id="a-r4-c2">a-r4-c2</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="node.id === 'b'" style="background-color: #bbbbbb;width: 400px;">
            <!---------------- if node b ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>
                  <div id="b-r1-c1">b-r1-c1</div>
                </th>
                <th>
                  <div id="b-r1-c2">b-r1-c2</div>
                </th>
                <th>
                  <div id="b-r1-c3">b-r1-c3</div>
                </th>
              </tr>
              <tr>
                <td>
                  <div id="b-r2-c1">b-r2-c1</div>
                </td>
                <td>xxxx</td>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>
                  <div id="b-r3-c1">b-r3-c1</div>
                </td>
                <td>
                  <div id="b-r3-c2">b-r3-c2</div>
                </td>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>xxxx</td>
                <td>
                  <div id="b-r4-c3">b-r4-c3</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="node.id === 'c'" style="background-color: #bbbbbb;width: 400px;">
            <!---------------- if node c ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>
                  <div id="c-r1-c1">c-r1-c1</div>
                </th>
                <th>
                  <div id="c-r1-c2">c-r1-c2</div>
                </th>
              </tr>
              <tr>
                <th>
                  <div id="c-r2-c1">c-r2-c1</div>
                </th>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>
                  <div id="c-r4-c1">c-r4-c1</div>
                </td>
                <td>
                  <div id="c-r4-c2">c-r4-c2</div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="node.id === 'd'" style="background-color: #bbbbbb;width: 300px;">
            <!---------------- if node d ---------------->
            <div class="c-table-title">{{ node.text }}</div>
            <table class="c-data-table">
              <tr>
                <th>
                  <div id="d-r1-c1">d-r1-c1</div>
                </th>
                <th>列2</th>
              </tr>
              <tr>
                <td>
                  <div id="d-r2-c1">d-r2-c1</div>
                </td>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>xxxx</td>
              </tr>
              <tr>
                <td>xxxx</td>
                <td>
                  <div id="d-r4-c2">d-r4-c2</div>
                </td>
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
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'RelationGraphDemo4',
  components: {},
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        debug: true,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        allowShowDownloadButton: true,
        defaultJunctionPoint: 'border',
        placeOtherNodes: false,
        placeSingleNode: false,
        graphOffset_x: -200,
        graphOffset_y: 100,
        defaultLineMarker: {
          markerWidth: 8,
          markerHeight: 8,
          refX: 3,
          refY: 3,
          data: "M 0 0, V 6, L 4 3, Z"
        },
        layout: {
          layoutName: 'fixed'
        }
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showGraph();
  },
  methods: {
    showGraph() {
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'A区内配矿', nodeShape: 1, x: -500, y: -200 },
          { id: 'b', text: 'B区内洗选贸易企业', nodeShape: 1, x: 0, y: -400 },
          { id: 'c', text: 'C区内电场焦化企业', nodeShape: 1, x: 500, y: -200 },
          { id: 'd', text: 'D区外企业', nodeShape: 1, x: 0, y: 0 }
        ],
        lines: [
        ],
        elementLines: [
          { from: 'a-r2-c2', to: 'b-r1-c1', text: '', lineShape: 6, color: 'rgba(29,169,245,0.76)', lineWidth: 3 },
          { from: 'a-r2-c2', to: 'b-r2-c1', text: '', lineShape: 6, color: 'rgba(29,169,245,0.76)', lineWidth: 3 },
          { from: 'a-r3-c2', to: 'b-r3-c1', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'a-r3-c2', to: 'd-r2-c1', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'a-r3-c2', to: 'c-r4-c1', text: '', lineShape: 5, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'b-r1-c3', to: 'c-r1-c1', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'd-r4-c2', to: 'c-r4-c2', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'd-r2-c1', to: 'c-r4-c2', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'd-r2-c1', to: 'b-r4-c3', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          { from: 'b-r3-c2', to: 'c-r2-c1', text: '', lineShape: 6, color: 'rgba(159,23,227,0.65)', lineWidth: 3 },
          // { from: 'el-1', to: 'el-2', text: 'Line Text', lineShape: 6, color: 'red', lineWidth: 4, showEndArrow: false },
          // { from: 'el-1', to: 'd-1', text: 'Line Text', lineShape: 6, color: 'red', lineWidth: 4, showEndArrow: false },
        ]
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
      const allLinks = this.$refs.graphRef.getLinks();
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
          console.log(link.fromNode)
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
            line.color = "#ffa00b";
            line.lineWidth = 5;
          });
        });
      })

      // 让与{nodeObject}相关的所有连线高亮
      // allLinks.filter(link => (link.fromNode === nodeObject || link.toNode === nodeObject)).forEach(link => {
      //   console.log(link.fromNode)
      //   link.relations.forEach(line => {
      //     console.log('line:', line);
      //     line.data.orignColor = line.color;
      //     line.data.orignFontColor = line.fontColor || line.color;
      //     line.data.orignLineWidth = line.lineWidth || 1;
      //     line.lineWidth = 3;
      //   });
      // });
      // // 有时候更改一些属性后，并不能马上同步到视图，这需要以下方法让视图强制根据数据同步到最新
      this.$refs.graphRef.getInstance().dataUpdated();
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
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
    }
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
