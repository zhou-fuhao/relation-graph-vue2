<template>
  <div id="demo1" ref="demo1">
  </div>
</template>

<script>
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
    {
      id: 'node3', // String，节点的唯一标识
      x: 400,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'javascript', // String，节点标签
    },
    {
      id: 'node4', // String，节点的唯一标识
      x: 200,      // Number，必选，节点位置的 x 值
      y: 380,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'vue', // String，节点标签
    },
    {
      id: 'node5', // String，节点的唯一标识
      x: 400,      // Number，必选，节点位置的 x 值
      y: 380,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'vue2', // String，节点标签
    },
    {
      id: 'node6', // String，节点的唯一标识
      x: 400,      // Number，必选，节点位置的 x 值
      y: 480,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'vue3', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
      label: '关系2', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
    },
    {
      source: 'node2', // String，必须，起始节点 id
      target: 'node3', // String，必须，目标节点 id
      label: '关系3', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
    },
    {
      source: 'node2', // String，必须，起始节点 id
      target: 'node4', // String，必须，目标节点 id
      label: '关系4', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
    },
    {
      source: 'node4', // String，必须，起始节点 id
      target: 'node5', // String，必须，目标节点 id
      label: '', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
    },
    {
      source: 'node4', // String，必须，起始节点 id
      target: 'node6', // String，必须，目标节点 id
      label: '', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
    },
  ],
};

import { Graph, Shape, Node } from '@antv/x6';
import lodash from 'lodash';

// 创建节点
const rect = new Shape.Rect({
  id: 'temp1',
  x: 250,
  y: 40,
  width: 100,
  height: 40,
  attrs: {
    body: {
      // fill: '#2ECC71', // 背景颜色
      stroke: '#000',  // 边框颜色
    },
    label: {
      text: 'rect',    // 文本
      // fill: '#333',    // 文字颜色
      // fontSize: 13,    // 文字大小
    },
  },
  // tools: [
  //   // { name: 'boundary' },
  //   {
  //     name: 'button-remove',  // 工具名称
  //     args: { x: 0, y: 0 }, // 工具对应的参数
  //   },
  // ]
});

// 创建边
const edge = new Shape.Edge({
  source: 'node1', // 源节点或起始点。
  target: 'temp1', // 目标节点或目标点。
  label: '关系1', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
  // attrs: {
  //   line: {
  //     stroke: "#7c68fc", // 指定 path 元素的填充色
  //   },
  // },
})

export default {
  name: 'demo1',
  data() {
    return {}
  },
  methods: {

  },
  mounted() {
    const graph = new Graph({
      container: document.getElementById('demo1'),
      width: '100%',
      height: 900,
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    });

    graph.fromJSON(data);

    // 添加到画布
    graph.addNode(rect);
    // 添加到画布
    graph.addEdge(edge);

    graph.on('cell:mouseenter', ({ cell }) => {
      if (cell.isNode()) {
        cell.addTools([
          {
            name: 'boundary',
            args: {
              attrs: {
                fill: '#7c68fc',
                stroke: '#333',
                'stroke-width': 1,
                'fill-opacity': 0.2,
              },
            },
          },
          {
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: 10, y: 10 },
            },
          },
        ])
        // } else {
        //   cell.addTools(['vertices', 'segments'])
      }
    })

    graph.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools()
    })

    graph.on('node:click', ({ e, x, y, node, view }) => {
      // console.log('node:click', e, x, y, node, view);
      console.log(node);
      // console.log(lodash.get(node, '_model'));

      reset();
      node.attr('body/stroke', 'orange')

    });

    graph.on('edge:click', ({ e, x, y, edge, view }) => {
      // console.log('edge:click', e, x, y, edge, view);
      console.log(edge);

      reset()
      edge.attr('line/stroke', 'orange');
    });

    function reset() {
      const nodes = graph.getNodes()
      const edges = graph.getEdges()

      nodes.forEach((node) => {
        node.attr('body/stroke', '#000');
      })

      edges.forEach((edge) => {
        edge.attr('line/stroke', 'black');
      })
    }


  }
}
</script>

<style scoped>
@keyframes ant-line {
  to {
    stroke-dashoffset: -1000
  }
}
</style>
