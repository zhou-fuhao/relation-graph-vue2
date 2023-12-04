<template>
  <div>
    <div id="container">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in leftList"
            :key="'left' + index"
            :id="item.nodeId"
            name="source"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div class="right">
        <ul>
          <li
            v-for="(item, index) in rightList"
            :key="'right' + index"
            :id="item.nodeId"
            name="target"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      jsPlumb: null, // 缓存实例化的jsplumb对象
      leftList: [
        { name: "xxx_left_1", nodeId: "left_1" },
        { name: "xxx_left_2", nodeId: "left_2" },
        { name: "xxx_left_3", nodeId: "left_3" },
        { name: "xxx_left_4", nodeId: "left_4" },
      ],
      rightList: [
        { name: "xxx_right_1", nodeId: "right_1" },
        { name: "xxx_right_2", nodeId: "right_2" },
        { name: "xxx_right_3", nodeId: "right_3" },
        { name: "xxx_right_4", nodeId: "right_4" },
      ],
      list: [],
    };
  },
  mounted() {
    this.showPlumb();
  },
  methods: {
    showPlumb() {
      this.jsPlumb = this.$jsPlumb.getInstance({
        Container: "container", // 选择器id
        EndpointStyle: { radius: 0.11, fill: "#999" }, // 端点样式
        PaintStyle: { stroke: "#999", strokeWidth: 2 }, // 绘画样式，默认8px线宽  #456
        HoverPaintStyle: { stroke: "#994B0A", strokeWidth: 3 }, // 默认悬停样式  默认为null
        ConnectionOverlays: [
          // 此处可以设置所有箭头的样式
          [
            "Arrow",
            {
              // 设置参数可以参考中文文档
              location: 1,
              length: 12,
              width: 10,
              paintStyle: {
                stroke: "#999",
                fill: "#999",
              },
            },
          ],
        ],
        Connector: [
          "Straight",
          {
            gap: 2,
            cornerRadius: 5,
            alwaysRespectStubs: true,
          },
        ], // 要使用的默认连接器的类型：直线，折线，曲线等
        DrapOptions: { cursor: "crosshair", zIndex: 2000 },
      });

      this.jsPlumb.batch(() => {
        for (let i = 0; i < this.leftList.length; i++) {
          this.initLeaf(this.leftList[i].nodeId, "source");
        }
        for (let j = 0; j < this.rightList.length; j++) {
          this.initLeaf(this.rightList[j].nodeId, "target");
        }
      });

      this.$nextTick(() => {
        let relations = [
          ["left_1", "right_1"],
          ["left_2", "right_2"],
        ];
        this.jsPlumb.ready(() => {
          for (let item of relations) {
            this.jsPlumb.connect({
              source: item[0],
              target: item[1],
            });
          }
        });
      });

      this.setjsPlumb(true, true);

      //点击连线删除当前映射线
      this.jsPlumb.bind("click", (conn, originalEvent) => {
        console.log("点击连线", conn, originalEvent);
        this.$confirm(
          `确定删除从${conn.sourceId}到${conn.targetId}连接的线吗?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            var line = this.jsPlumb.getConnections({
              source: conn.sourceId,
              target: conn.targetId,
            })[0];
            this.jsPlumb.deleteConnection(line); // 删除当前映射线
          })
          .catch(() => {});
      });

      //连线时触发
      this.jsPlumb.bind("connection", (conn, originalEvent) => {
        // console.log(conn.sourceId);
        // console.log(conn.targetId);
        this.list.push({ source: conn.sourceId, target: conn.targetId });
        console.log(this.list, "this.list");
      });

      //右键触发
      this.jsPlumb.bind("contextmenu", (conn, originalEvent) => {
        console.log(conn, originalEvent);
      });
    },

    //  初始化规则使其可以连线、拖拽
    initLeaf(id, type) {
      const ins = this.jsPlumb;
      const elem = document.getElementById(id);
      if (type === "source") {
        ins.makeSource(elem, {
          anchor: [1, 0.5, 0, 0], // 左 上 右 下
          allowLoopback: false, //允许回连
          maxConnections: 1, //最大连接数（-1表示不限制）
        });
      } else {
        ins.makeTarget(elem, {
          anchor: [0, 0.5, 0, 0],
          allowLoopback: false,
          maxConnections: 1,
        });
      }
    },
    setjsPlumb(sourceFlag, targetFlag) {
      const source = document.getElementsByName("source");
      const target = document.getElementsByName("target");

      this.jsPlumb.setSourceEnabled(source, sourceFlag);
      this.jsPlumb.setTargetEnabled(target, targetFlag);
      this.jsPlumb.setDraggable(source, false); // 是否支持拖拽
      this.jsPlumb.setDraggable(target, false); // 是否支持拖拽
    },
  },
};
</script>

<style>
li {
  list-style: none;
}
#container {
  width: 500px;
  height: 500px;
  padding: 20px;
  position: relative; /*一定加上这句，否则连线位置发生错乱*/
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