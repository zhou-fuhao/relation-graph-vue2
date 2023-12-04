<template>
  <div>
    <div id="container">
      <div class="left">
        <ul>
          <li v-for="(item, index) in leftList" :key="'left' + index" :id="item.nodeId" name="source">
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div class="right">
        <ul>
          <li v-for="(item, index) in rightList" :key="'right' + index" :id="item.nodeId" name="target">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import jsPlumb from 'jsplumb';
import lodash from 'lodash';

export default {
  name: 'demo1',
  data() {
    return {
      jsPlumb: null, // 缓存实例化的jsplumb对象
      leftList: [
        { name: 'xxx_left_1', nodeId: 'left_1' },
        { name: 'xxx_left_2', nodeId: 'left_2' },
        { name: 'xxx_left_3', nodeId: 'left_3' },
        { name: 'xxx_left_4', nodeId: 'left_4' }
      ],
      rightList: [
        { name: 'xxx_right_1', nodeId: 'right_1' },
        { name: 'xxx_right_2', nodeId: 'right_2' },
        { name: 'xxx_right_3', nodeId: 'right_3' },
        { name: 'xxx_right_4', nodeId: 'right_4' }
      ],
      canvasData: {
        lineList: [
          {
            from: 'left_1',
            to: 'right_1',
            label: '连线名称1'
          },
          {
            from: 'left_1',
            to: 'right_3',
            label: '连线名称2'
          },
          {
            from: 'left_2',
            to: 'right_3',
            label: '连线名称3'
          },
          {
            from: 'left_4',
            to: 'right_4',
            label: '连线名称4'
          }
        ]
      }
    }
  },
  methods: {
    showPlumb() {
      this.jsPlumb = this.$jsPlumb.getInstance({
        Container: 'container', // 选择器id
        EndpointStyle: { radius: 0.11, fill: '#999' }, // 端点样式
        PaintStyle: { stroke: '#999', strokeWidth: 2 }, // 绘画样式，默认8px线宽  #456
        HoverPaintStyle: { stroke: '#994B0A', strokeWidth: 3 }, // 默认悬停样式  默认为null
        ConnectionOverlays: [ // 此处可以设置所有箭头的样式
          ['Arrow', { // 设置参数可以参考中文文档
            location: 1,
            length: 12,
            paintStyle: {
              stroke: '#999',
              fill: '#999'
            }
          }]
        ],
        Connector: ['Straight'], // 要使用的默认连接器的类型：直线，折线，曲线等
        DrapOptions: { cursor: 'crosshair', zIndex: 2000 }
      });

      // jsplumb连接参数
      const jsplumbConnectOptions = {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: "Continuous",
      }
      // 初始化连线
      for (var i = 0; i < this.canvasData.lineList.length; i++) {
        let line = this.canvasData.lineList[i]
        let connection = this.jsPlumb.connect({
          source: line.from,
          target: line.to,
        }, jsplumbConnectOptions);
        connection.setLabel(line.label); //初始化label
      }
    },

  },
  mounted() {
    this.showPlumb();

  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

#container {
  width: 500px;
  height: 500px;
  padding: 20px;
  position: relative;
  /*一定加上这句，否则连线位置发生错乱*/
}

.left {
  float: left;
  width: 150px;
}

.right {
  float: right;
  width: 150px;
}

.left li,
.right li {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #efefef;
  margin-bottom: 20px;
  padding: 8px 5px;
}
</style>
