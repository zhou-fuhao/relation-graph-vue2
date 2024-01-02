<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";
import lodash from 'lodash';
let graph = null;

const data = {
  isRoot: true,
  id: 'Root',
  label: '隔壁老王',
  text: '\ue602', // 对应iconfont.css 里面的content，注意加u，后面的自行修改一下。
  style: {
    fill: 'red',
  },
  labelCfg: {
    style: {
      fill: 'red',
    },
  },
  backgroundConfig: null, // 自定义项，用于判读是否需要圆背景
  size: 30,
  children: [
    {
      id: 'SubTreeNode1',
      label: '网咖',
      text: '\ue620',
      relation: '上网',
      children: [
        {
          id: 'SubTreeNode2',
          label: '多伦多',
          text: '\ue62b',
        },
        {
          id: 'id1',
          label: '小王',
          text: '\ue6ef',
          children: [
            {
              id: 'SubTreeNode1.2.1',
              label: '182****2123',
              text: '\ue85a',
            },
            {
              id: 'SubTreeNode4',
              label: '今晚在吗',
              text: '\ue692',
            },
          ],
        },
      ],
    },
    {
      id: 'SubTreeNode3',
      label: 'subway',
      text: '\ue6b5',
      children: [
        {
          id: 'SubTreeNode3.1',
          label: '王五',
          text: '\ue679',
        },
        {
          id: 'SubTreeNode3.2',
          label: '张三',
          text: '\ue63a',
        },
      ],
    },
    {
      id: 'SubTreeNode5',
      label: '小花',
      relation: '老婆',
      text: '\ue600',
      backgroundConfig: {
        fill: 'Coral',
      },
      style: {
        fill: '#fff',
      },
      labelCfg: {
        style: {
          fill: 'Coral',
        },
      },
      children: [
        {
          id: 'SubTreeNode1.2.2',
          label: '182****2123',
          text: '\ue629',
          relation: '通话',
          backgroundConfig: {
            fill: 'Coral',
          },
          style: {
            fill: '#fff',
          },
          labelCfg: {
            style: {
              fill: 'Coral',
            },
          },
        },
        {
          id: 'SubTreeNode3.3',
          label: '凶器',
          text: '\ue655',
          relation: '指纹',
          backgroundConfig: {
            fill: 'Coral',
          },
          style: {
            fill: '#fff',
          },
          labelCfg: {
            style: {
              fill: 'Coral',
            },
          },
        },
      ],
    },
    {
      id: 'SubTreeNode6',
      label: '飞机',
      relation: '乘坐',
      text: '\ue656',
    },
  ],
};

export default {
  data() {
    return {

    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    if (typeof graph !== 'undefined') {
      graph.destroy();
    }
  },
  methods: {
    init() {
      G6.registerNode('iconfont', {
        draw(cfg, group) {
          const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg;

          if (backgroundStyle) {
            group.addShape('circle', {
              attrs: {
                x: 0,
                y: 0,
                r: cfg.size,
                ...backgroundStyle,
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'circle-shape',
            });
          }

          const keyShape = group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
              textAlign: 'center',
              textBaseline: 'middle',
              text: cfg.text,
              fontSize: cfg.size,
              ...style,
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'text-shape1',
          });
          const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;

          group.addShape('text', {
            attrs: {
              x: 0,
              y: labelY,
              textAlign: 'center',
              text: cfg.label,
              ...labelStyle.style,
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'text-shape1',
          });
          return keyShape;
        },
      });

      const COLOR = '#40a9ff';
      graph = new G6.TreeGraph({
        container: 'container',
        modes: {
          default: ['collapse-expand', 'drag-canvas', 'drag-node', 'zoom-canvas'],
        },
        fitView: true,
        maxZoom: 1.5,
        defaultNode: {
          backgroundConfig: {
            backgroundType: 'circle',
            fill: COLOR,
            stroke: 'LightSkyBlue',
          },
          type: 'iconfont',
          size: 12,
          style: {
            fill: '#fff',
          },
          labelCfg: {
            style: {
              fill: COLOR,
              fontSize: 12,
            },
          },
        },
        // 布局相关
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId(d) {
            return d.id;
          },
          getHeight() {
            return 16;
          },
          getWidth() {
            return 16;
          },
          getVGap() {
            return 20;
          },
          getHGap() {
            return 60;
          },
        },
      });

      graph.edge(({ target }) => {
        const fill = lodash.get(target, 'model.backgroundConfig') && lodash.get(target, 'model.backgroundConfig.fill');
        return {
          type: 'cubic-horizontal',
          color: fill || COLOR,
          label: lodash.get(target, 'model.relation') || '',
          labelCfg: {
            style: {
              fill: fill || COLOR,
              fontSize: 12,
            },
          },
        };
      });

      graph.data(data);
      graph.render();
      // graph.fitView();
    }
  },
};
</script>

<style lang="less" scpoed>
@import "../../../static/font/iconfont.css";

#container {
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
