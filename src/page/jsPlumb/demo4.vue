<template>
  <div class="hello">
    <h1 style="text-align:center;padding:50px">JsPlumb + D3js实现自定义节点，可拖拽节点,自动树状布局</h1>
    <div id="relation-box">
      <div class="node" v-for="item in nodeList" :key="item.id" :style="{ left: item.left, top: item.top }"
        :id="'node-' + item.id">
        {{ item.name }}
        <div>detail...</div>
      </div>
    </div>
  </div>
</template>


<script>
import { jsPlumb } from "jsplumb";
import * as D3 from "d3";
export default {
  name: 'landing-page',
  data() {
    return {
      jsPlumbInstance: "", //jsPlumb实例
      // jsPlumb默认配置
      jsPlumbSetting: {
        // 动态锚点、位置自适应
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        // 连线的样式 StateMachine、Flowchart，Bezier、Straight
        Connector: ['Bezier', { curviness: 60 }],
        // 鼠标是否拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的两端端点类型：矩形 Rectangle；圆形Dot； eight: 矩形的高 ，idth: 矩形的宽
        Endpoints: [['Dot', { radius: 2, }], ['Dot', { radius: 2 }]],
        // 线端点的样式
        EndpointStyle: { fill: 'skyblue', outlineWidth: 1 },
        // 绘制连线
        PaintStyle: {
          stroke: '#000000',
          strokeWidth: 1,
          outlineStroke: 'transparent',
          // 设定线外边的宽，单位px
          outlineWidth: 10
        },
        // 绘制连线箭头
        Overlays: [// 箭头叠加
          ['Arrow', {
            width: 10, // 箭头尾部的宽度
            length: 8, // 从箭头的尾部到头部的距离
            location: 1, // 位置，建议使用0～1之间
            direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
            foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
          }]
        ],
        // 绘制图的模式 svg、canvas
        RenderMode: 'svg',
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // 鼠标滑过线的样式
        HoverPaintStyle: { stroke: 'skyblue', strokeWidth: 3, cursor: 'pointer' },
      },
      // 连线的配置
      jsPlumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: "Continuous",
        overlays: [['Arrow', { width: 8, length: 8, location: 1 }]] // overlay
      },
      commonLink: {
        isSource: true,
        isTarget: true,
        anchor: ["Perimeter", { shape: "Circle" }],
        connector: ['Bezier'],
        endpoint: 'Dot',
        // 不限制节点的连线数量
        maxConnections: -1,
      },
      dataList: {
        id: 1,
        name: "中国",
        children: [
          {
            id: 2,
            name: "北京",
            children: [
              {
                id: 6,
                name: "海淀区"
              },
              {
                id: 7,
                name: "高新区"
              }
            ]
          },
          {
            id: 3,
            name: "贵州",
            children: [
              {
                id: 4,
                name: "贵阳"
              },
              {
                id: 5,
                name: "黔西南"
              },
              {
                id: 8,
                name: "黔东南"
              }
            ]
          }
        ]
      },
      nodeList: [],
      lineList: []
    }
  },
  mounted() {
    this.setNodeInfo(this.dataList);
    this.drawLines();
  },
  methods: {
    setNodeInfo(tree) {
      // 参考D3API,这里会生成树形数据结构
      const data = D3.hierarchy(tree);
      // 使用D3 Tree自动布局, nodeSize控制节点x方向和y方向上的距离
      const treeGenerator = D3.tree().nodeSize([200, 180]);
      const treeData = treeGenerator(data);
      // 获取自动布局后的节点信息
      const nodes = treeData.descendants();
      // 获取父子关系列表
      const links = treeData.links();
      // 设置节点位置信息
      this.nodeList = nodes.map(item => {
        return {
          id: item.data.id,
          name: item.data.name,
          left: item.x + 900 + "px", // 900为初始X方向起点位置，默认为0
          top: item.y + "px"
        };
      });

      this.lineList = links.map(item => {
        return {
          source: `node-${item.source.data.id}`,
          target: `node-${item.target.data.id}`,
          overlays: [["Arrow", { width: 10, length: 10, location: 0.5 }]]
        }
      })
    },
    drawLines() {
      this.$nextTick().then(() => {
        jsPlumb.ready(() => {
          // 创建jsPlumb实例
          this.jsPlumbInstance = jsPlumb.getInstance();
          // 导入准备好的jsPlumb配置
          this.jsPlumbInstance.importDefaults(this.jsPlumbSetting);
          // 开始节点间的连线
          this.lineList.forEach((item) => {
            this.jsPlumbInstance.connect(item, this.jsPlumbConnectOptions);
          });
          // 让每个节点都可以被拖拽
          this.nodeList.forEach((item, index) => {
            this.jsPlumbInstance.draggable("node-" + (index + 1))
          })
          // 给每个节点添加锚点
          this.jsPlumbInstance.addEndpoint("node-" + (index + 1), {
            anchor: ['Bottom', 'Top', 'Left', 'Right'],
            Overlays: [
              ['Arrow', { width: 10, length: 8, location: 1, direction: 1, foldback: 0.623 }]]
          }, this.commonLink)
        })
        this.jsPlumbInstance.repaintEverything(); // 重绘
      })
    }

  }
}
</script>

<style scoped>
#relation-box {
  position: relative;
}

.node {
  position: absolute;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  text-align: center;
  background-color: #f6f6f6;
}
</style>
