<template>
  <div id="container"></div>
</template>


<script>
import G6 from '@antv/g6';
const data = {
  id: "1",
  label: '老大（最外层）',
  "children": [
    {
      "id": "1-1",
      label: '第二层1',
    },
    {
      "id": "1-2",
      label: '第二层2',
    },
    {
      "id": "1-3",
      label: '第二层3',
    },
    {
      "id": "1-4",
      label: '第二层4',
    },
    {
      "id": "1-5",
      label: '第二层5',
      "children": [
        {
          "id": "1-5-1",
          label: '第三层1',
          children: [
            {
              "id": "1-5-1-1",
              label: '第四层1'
            },
            {
              "id": "1-5-1-2",
              label: '第四层2'
            },
            {
              "id": "1-5-1-3",
              label: '第四层3'
            }
          ]
        },
        {
          "id": "1-5-2",
          label: '第三层2',
          children: [
            {
              "id": "1-5-2-1",
              label: '第四层4'
            },
            {
              "id": "1-5-2-2",
              label: '第四层5'
            }
          ]
        },
        {
          "id": "1-5-3",
          label: '第三层3',
          children: [
            {
              "id": "1-5-3-1",
              label: '第四层6'
            },
            {
              "id": "1-5-3-2",
              label: '第四层7'
            },
            {
              "id": "1-5-3-3",
              label: '第四层8'
            },
            {
              "id": "1-5-3-4",
              label: '第四层9'
            },
            {
              "id": "1-5-3-5",
              label: '第四层10'
            }
          ]
        },
        {
          "id": "1-5-4",
          label: '第三层4',
          children: [
            {
              "id": "1-5-4-1",
              label: '第四层11'
            },
            {
              "id": "1-5-4-2",
              label: '第四层12'
            },
            {
              "id": "1-5-4-3",
              label: '第四层13'
            },
            {
              "id": "1-5-4-4",
              label: '第四层14'
            }
          ]
        }
      ]
    },
    {
      "id": "1-6",
      label: '第二层6'
    }
  ]
};

export default {
  data() {
    return {

    }
  },
  methods: {
    init() {
      const container = document.getElementById('container');
      const descriptionDiv = document.createElement('div');
      descriptionDiv.innerHTML = `可伸缩决策树`;
      descriptionDiv.style.position = 'absolute';
      descriptionDiv.style.margin = '8px';
      container.appendChild(descriptionDiv);
      // 定义画布的宽高
      const width = document.getElementById('container').scrollWidth || 800;
      const height = document.getElementById('container').scrollHeight || 800;
      // 实例化G6  
      // 因为我们用的是树图，所以这里是G6.TreeGraph(),还有其他，像是普通图的配置G6.Graph(),一般y用的比较多的就像是树图这种，还有组织架构图一类的。
      const graph = new G6.TreeGraph({
        // 图的  DOM 容器，对应上面我们定义的id
        container: 'container',
        width,
        height,
        // 是否开启画布自适应。开启后图自动适配画布大小。
        fitView: true,
        // fitView 为 true 时生效。图适应画布时，指定四周的留白。可以是数组，fitViewPadding: [ 20, 40, 50, 20 ]
        fitViewPadding: 10,
        // v3.5.1 后支持。开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView。
        fitCenter: true,
        // 最小缩放比例
        // minZoom: 1.5,
        // 最大缩放比例
        maxZoom: 1.5,
        // 指定边是否连入节点的中心
        linkCenter: false,
        // 设置画布的交互模式
        modes: {
          default: [
            {
              // 只适用于树图，展开或收起子树
              type: 'collapse-expand',
              // trigger：收起和展开节点分组的方式。支持 'click' 和 'dblclick' 两种方式。默认为 'dblclick'，即双击。
              trigger: 'click',
            },
            // 拖拽画布
            'drag-canvas',
            // 缩放画布
            'zoom-canvas',
          ],
        },
        // 配置节点的属性
        defaultNode: {
          // 节点类型，cicle:圆形，rect:矩形，ellipse:椭圆，diamond:菱形，triangle：三角形，star：五角星，image：图片，modelRect：卡片
          type: 'rect',
          // size 设置矩形的长和宽
          size: [120, 34],
          // 指定边连入节点的连接点的位置，可以为空，具体可以看一下官网是通过0、0.5、1来控制哪个点的。
          anchorPoints: [
            [0, 0.5], [1, 0.5]
          ],
          // 节点样式
          style: {
            // 节点填充色
            fill: '#DDE2E9',
            // 节点的描边颜色。
            stroke: '',
            // 阴影颜色
            shadowColor: '#f00',
            // 阴影范围
            shadowBlur: 5,
            // 鼠标经过是的形状，跟css是一样的。
            cursor: 'pointer',
            // 圆角
            radius: 4,
          },
          // 配置节点中的文字。
          labelCfg: {
            // 节点文字位置
            // position: 'top',
            // 偏移量
            // offset: 5,
            // 标签的样式属性。
            style: {
              // 文本颜色
              fill: '#535D79',
              // 文本字体大小
              fontSize: 14,
            },
          },
          // 文本文字 （如果自定义节点了或者用graph.node（）配置了节点，这里不生效，因为那两种优先级更高，下面的边也是一样）
          label: 'node-label'
        },
        // 配置边的属性
        defaultEdge: {
          // 指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。
          // line:直线，polyline：折线，arc：圆弧线，quadratic：二阶贝塞尔曲线，cubic：三阶贝塞尔曲线，cubic-vertica：垂直方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点。cubic-horizontal：水平方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点。loop：自环
          type: 'cubic-horizontal',
          // 边的样式属性
          style: {
            // 边的颜色
            stroke: '#A3B1BF',
            // 边的宽度
            lineWidth: 5,
            // 边是否带箭头
            endArrow: true,
          },
          // 配置边上文本的属性
          labelCfg: {
            // 文本相对于边的位置，目前支持的位置有：'start'，'middle'，'end'。默认为'middle'。
            position: 'middle',
            // 标签文字是否跟随边旋转
            autoRotate: true,
            style: {
              // 	文本颜色
              fill: '#f00'
            }
          },
          // 文本文字 （如果自定义节点了或者用graph.edge（）配置了节点，这里不生效，因为那两种优先级更高）
          label: '边'
        },
        // 布局配置项
        layout: {
          // 布局名称,这个可就太多了，这个只是树图结构中的一种。比如还有compactBox：紧凑树布局，dendrogram：生态树布局，indented：缩紧树布局。
          type: 'mindmap', // 脑图树布局
          direction: 'H', // H / V / LR / RL / TB / BT 这些是控制节点分布位置，从左往右、从右往左、从中间往上下延伸、从中间往左右延伸...具体可以看官网
          // 节点 id 的回调函数
          getId: function getId(d) {
            return d.id;
          },
          // 下面都是一些控制节点与节点间距离的回调函数，具体可以试着修改一下值。
          // 节点高度的回调函数
          getHeight: function getHeight() {
            return 16;
          },
          // 节点宽度的回调函数
          getWidth: function getWidth() {
            return 16;
          },
          // 节点纵向间距的回调函数
          // getVGap: function getVGap() {
          //   return 50;
          // },
          // 节点横向间距的回调函数
          getHGap: function getHGap(val) {
            return 100;
          },
        },
        // 动画属性
        animate: true,
      });

      // 设置各个节点样式及其他配置，该方法必须在 render 之前调用，否则不起作用，必须要 return。
      // 如果节点不满足自己的需求，可以在这里设置想要的节点样式，这只是其中的一种，后面还会介绍功能更加全面的自定义节点。
      graph.node(function (node) {
        if (node.id === '1-6' || node.id === '1-1') {
          return {
            labelCfg: {
              style: {
                fill: '#fff',
              },
            },
            style: {
              fill: '#946DFF',
            }
          }
        }
        return true
      });

      // 设置边的属性及其他配置，跟上面设置节点一样，这里设置了，上面defaultEdge里面设置的边不管写什么都不会生效，因为这个的优先级要比上面的defaultEdge优先级高。
      // 也可以通过判断来实现不同边的样式、文字等，后面也会介绍更加全面的自定义边。
      graph.edge(function (node) {
        return {
          label: '边'
        }
      })
      // 初始化的图数据
      graph.data(data);
      // 根据提供的数据渲染视图。
      graph.render();
      // 让画布内容适应视口
      graph.fitView();
    }
  },
  created() { },
  mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped></style>