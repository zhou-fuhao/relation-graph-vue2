<template>
  <div id="container">
  </div>
</template>

<script>
import DataJson from "../../data/demo2.json";
import { Graph, Cell, Shape } from '@antv/x6';
const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;

Graph.registerPortLayout(
  'erPortPosition',
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: (index + 1) * LINE_HEIGHT,
        },
        angle: 0,
      }
    })
  },
  true,
)

Graph.registerNode(
  'er-rect',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      rect: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#5F95FF',
      },
      label: {
        fontWeight: 'bold',
        fill: '#ffffff',
        fontSize: 12,
      },
    },
    ports: {
      groups: {
        list: {
          markup: [
            {
              tagName: 'rect',
              selector: 'portBody',
            },
            {
              tagName: 'text',
              selector: 'portNameLabel',
            },
            {
              tagName: 'text',
              selector: 'portTypeLabel',
            },
            {
              tagName: 'image',
              selector: 'portImage'
            },
            {
              tagName: 'button',
              selector: 'portButton'
            }
          ],
          attrs: {
            portBody: {
              width: NODE_WIDTH,
              height: LINE_HEIGHT,
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
              // magnet: true,
            },
            portNameLabel: {
              ref: 'portBody',
              refX: 6,
              refY: 6,
              fontSize: 10,
            },
            portTypeLabel: {
              ref: 'portBody',
              refX: 95,
              refY: 6,
              fontSize: 10,
            },
            portImage: {
              ref: 'portBody',
              width: 16,
              height: 16,
              x: 135,
              y: 4,
              event: 'node:port-contextmenu'
            }
          },
          position: 'erPortPosition',
        },
      },
    },
  },
  true,
)

export default {
  name: 'demo2',
  data() {
    return {}
  },
  methods: {

  },
  mounted() {
    const graph = new Graph({
      container: document.getElementById('container'),
      width: '100%',
      height: 900,
      grid: true,
      // grid: {
      //   size: 10,      // 网格大小 10px
      //   visible: true, // 渲染网格背景
      // },
      background: {
        color: '#fffbe6', // 设置画布背景颜色
      },
      // 是否启用画布平移能力
      panning: {
        enabled: true,
        // modifiers: ["alt"],
      },
      // Scroller 使画布具备滚动、平移、居中、缩放等能力
      scroller: {
        enabled: true,
        // pageVisible: true, // 是否分页
        // pageBreak: true, // 是否显示分页符
        autoResizeOptions: {
          minWidth: 1000,
          minHeight: 1000,
        },
      },
      // 鼠标滚轮的默认行为是滚动页面
      mousewheel: {
        enabled: true,
        // modifiers: ["ctrl", "meta"], // +按键为缩放
        minScale: 0.5,
        maxScale: 2,
      },
    });

    graph.fromJSON(DataJson);

    // 点击菜单事件
    graph.on('node:port-contextmenu', ({ e }) => {
      e.stopPropagation(); // 阻止冒泡
      console.log('ports', e, e.currentTarget.parentElement.getAttribute('port'))
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
        node.attr('body/stroke', '#A2B1C3');
      })

      edges.forEach((edge) => {
        edge.attr('line/stroke', '#A2B1C3');
      })
    }

  }
}
</script>

<style scoped></style>
