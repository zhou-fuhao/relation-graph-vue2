<template>
  <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
let graph = null;
export default {
  data() {
    return {

    }
  },
  methods: {
    init() {
      const tipDiv = document.createElement('div');
      tipDiv.innerHTML = `按住 'ctrl' 或 'shift' 并点选两个节点作为起点和终点。`;
      tipDiv.style.position = 'absolute';
      tipDiv.style.margin = '8px';
      document.getElementById('container').appendChild(tipDiv);

      const button = document.createElement('button');
      button.innerHTML = `查看最短路径`;
      button.style.position = 'absolute';
      button.style.marginTop = '36px';
      button.style.marginLeft = '8px';
      document.getElementById('container').appendChild(button);

      const container = document.getElementById('container');
      const width = container.scrollWidth;
      const height = 500 - 10;
      // const height = (container.scrollHeight || 500) - 40;

      graph = new G6.Graph({
        container: 'container',
        width,
        height,
        linkCenter: true,
        modes: {
          default: ['click-select', 'drag-canvas', 'drag-node', 'zoom-canvas'],
        },
        fitView: true,
      });
      fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
        .then((res) => res.json())
        .then((data) => {
          const clearStates = () => {
            graph.getNodes().forEach((node) => {
              graph.clearItemStates(node);
            });
            graph.getEdges().forEach((edge) => {
              graph.clearItemStates(edge);
            });
          };

          graph.on('canvas:click', (e) => {
            clearStates();
          });

          graph.data(data);
          graph.render();

          button.addEventListener('click', (e) => {
            const selectedNodes = graph.findAllByState('node', 'selected');
            if (selectedNodes.length !== 2) {
              alert('Please select TWO nodes!\n\r请选择有且两个节点！');
              return;
            }
            clearStates();
            const { findShortestPath } = G6.Algorithm;
            // path 为其中一条最短路径，allPath 为所有的最短路径
            const { path, allPath } = findShortestPath(
              data,
              selectedNodes[0].getID(),
              selectedNodes[1].getID(),
            );

            const pathNodeMap = {};
            path.forEach((id) => {
              const pathNode = graph.findById(id);
              pathNode.toFront();
              graph.setItemState(pathNode, 'highlight', true);
              pathNodeMap[id] = true;
            });
            graph.getEdges().forEach((edge) => {
              const edgeModel = edge.getModel();
              const source = edgeModel.source;
              const target = edgeModel.target;
              const sourceInPathIdx = path.indexOf(source);
              const targetInPathIdx = path.indexOf(target);
              if (sourceInPathIdx === -1 || targetInPathIdx === -1) return;
              if (Math.abs(sourceInPathIdx - targetInPathIdx) === 1) {
                graph.setItemState(edge, 'highlight', true);
              } else {
                graph.setItemState(edge, 'inactive', true);
              }
            });
            graph.getNodes().forEach((node) => {
              if (!pathNodeMap[node.getID()]) {
                graph.setItemState(node, 'inactive', true);
              }
            });
          });
        });

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight - 40);
        };
    }
  },
  created() { },
  mounted() {
    this.init();
  },
  destroyed() {
    graph.destroy();
  }
}
</script>

<style lang="less" scoped></style>