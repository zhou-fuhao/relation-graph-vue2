<template>
  <div>
    <button @click="btn">显示高亮</button>
    <button @click="add">增加节点</button>
    <div id="main"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      changeColor: "",
      gg: {
        nodes: [
          {
            chart: "",
            id: "1",
            dataType: "alps",
            // name: "alps_file1",
            // size: 40,//字体大小
            // visible: true,//控制是否隐藏
            label: "我会了", //文本
            // type: "circle",//圆形===映射节点的形状
            // lineWidth: 22, //映射边的粗细
            labelCfg: {
              positions: "center", // 标签的属性，标签在元素中的位置
              style: {
                // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
                fontSize: 30, // 标签的样式属性，文字字体大小
                fill: "#000", // 样式属性，元素的填充色
                // stroke: "#888", // 样式属性，元素的描边色
                // opacity: "0.3", //透明度
              },
            },

            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },

          {
            id: "2",
            dataType: "alps",
            name: "alps_file2",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "3",
            dataType: "alps",
            name: "alps_file3",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "4",
            dataType: "sql",
            name: "sql_file1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "5",
            dataType: "sql",
            name: "sql_file2",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "6",
            dataType: "feature_etl",
            name: "feature_etl_1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "7",
            dataType: "feature_etl",
            name: "feature_etl_1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "8",
            dataType: "feature_extractor",
            name: "feature_extractor",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
          {
            id: "9",
            dataType: "feature_extractor1",
            name: "feature_extractor1",
            conf: [
              {
                label: "conf",
                value: "pai_graph.conf",
              },
              {
                label: "dot",
                value: "pai_graph.dot",
              },
              {
                label: "init",
                value: "init.rc",
              },
            ],
          },
        ],
        edges: [
          {
            source: "1",
            target: "2",
          },
          {
            source: "1",
            target: "3",
          },
          {
            source: "2",
            target: "4",
          },
          {
            source: "3",
            target: "4",
          },
          {
            source: "4",
            target: "5",
          },
          {
            source: "5",
            target: "6",
          },
          {
            source: "6",
            target: "7",
          },
          {
            source: "6",
            target: "8",
          },
          {
            source: "6",
            target: "9",
          },
        ],
      },
    };
  },

  mounted() {
    this.g6();
  },
  methods: {
    btn() {
      this.changeColor.setItemState("1", "online", true);
      console.log(1);
    },
    add() {
      let obj = {
        id: "11",
        dataType: "feature_etl",
        name: "feature_etl_1",
        conf: [
          {
            label: "conf",
            value: "pai_graph.conf",
          },
          {
            label: "dot",
            value: "pai_graph.dot",
          },
          {
            label: "init",
            value: "init.rc",
          },
        ],
      };
      let arr = {
        source: "11",
        target: "9",
      };
      this.chart.add("node", obj);
      this.chart.add("edge", arr);
      //销毁画布
        // this.chart.destroy();
    },
    g6() {
      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: "#5B8FF9",
                fill: "#C6E5FF",
                lineWidth: 3,
              },
              name: "rect-shape",
            });
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold",
                },
                name: "text-shape",
              });
            }
            return rect;
          },
        },
        "single-node"
      );

      //   const width = document.getElementById("mian").scrollWidth;
      //   const height = document.getElementById("mian").scrollHeight || 300;

      const graph = new G6.Graph({
        container: "main",
        width: 1000,
        height: 1000,
        layout: {
          //Random Layout：随机布局；
          // Force Layout：经典力导向布局：
          // 力导向布局：一个布局网络中，粒子与粒子之间具有引力和斥力，从初始的随机无序的布局不断演变，逐渐趋于平衡稳定的布局方式称之为力导向布局。适用于描述事物间关系，比如人物关系、计算机网络关系等。
          // Circular Layout：环形布局；
          // Radial Layout：辐射状布局；
          // MDS Layout：高维数据降维算法布局；
          // Fruchterman Layout：Fruchterman 布局，一种力导布局；
          // Dagre Layout：层次布局；
          // Concentric Layout：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心；
          // Grid Layout：格子布局，将节点有序（默认是数据顺序）排列在格子上。
          // 树图布局：
          // Dendrogram Layout：树状布局（叶子节点布局对齐到同一层）；
          // CompactBox Layout：紧凑树布局；
          // Mindmap Layout：脑图布局；
          // Indented Layout：缩进布局。

          type: "dagre", //布局  默认Random
          //   preventOverlap: true, // 防止节点重叠
          //   nodeSize: 100,  节点大小，用于算法中防止节点重叠时的碰撞检测。如果在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
          //   linkDistance: 100, // 指定边距离为100
          nodesepFunc: (d) => {
            if (d.id === "3") {
              return 500;
            }
            return 50;
          },
          ranksep: 70,
          controlPoints: true,
        },
        defaultNode: {
          type: "sql",
        },
        // edgeStateStyles: {
        //   // 鼠标点击边，即 click 状态为 true 时的样式
        //   click: {
        //     stroke: "steelblue",
        //   },
        // },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5",
          },
        },

        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef",
          },
          online: {
            fill: "#00FF00",
          },
          alarm: {
            fill: "#FF0000",
          },
          warn: {
            fill: "#FFFF00",
          },
          //   鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: "#000",
          },
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            "drag-node", //允许拖拽画布，放缩画布、拖拽节点
            {
              type: "tooltip",
              formatText(model) {
                const cfg = model.conf;
                const text = [];
                cfg.forEach((row) => {
                  text.push(row.label + ":" + row.value + "<br>");
                });
                return text.join("\n");
              },
              offset: 30,
            },
          ],
        },
        fitView: true,
      });
      // 鼠标进入节点
      graph.on("node:click", (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
      });
      // 监听鼠标离开节点
      graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 false
        graph.setItemState(nodeItem, "hover", false);
      });
      // 点击节点
      //   graph.on("node:click", (e) => {
      //     // 先将所有当前是 click 状态的节点置为非 click 状态
      //     const clickNodes = graph.findAllByState("node", "click");
      //     clickNodes.forEach((cn) => {
      //       graph.setItemState(cn, "click", false);
      //     });
      //     const nodeItem = e.item; // 获取被点击的节点元素对象
      //     graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
      //   });
      // 点击边
      // graph.on('edge:click', (e) => {
      //   // 先将所有当前是 click 状态的边置为非 click 状态
      //   const clickEdges = graph.findAllByState('edge', 'click');
      //   clickEdges.forEach((ce) => {
      //     graph.setItemState(ce, 'click', false);
      //   });
      //   const edgeItem = e.item; // 获取被点击的边元素对象
      //   graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
      // });
      //   调试g6用
      //   this.gg是数据
      // 绑定关系图
      this.chart = graph;
      this.changeColor = graph;
      graph.data(this.gg);
      graph.render();
    },
  },
};
</script>

<style scpoed>
#main {
  width: 100%;
  height: 100%;
}
</style>
