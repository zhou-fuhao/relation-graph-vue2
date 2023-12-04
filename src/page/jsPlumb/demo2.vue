<template>
  <div id="wrap">
    <div class="content">
      <div class="row dataCont" id="module">
        <div class="data dataModelBox">
          <div class="dataTitle">
            <span class="title">
              左边内容
            </span>
          </div>
          <div class="tab">
            <table class="tabHead">
              <tr>
                <th width="200">名称</th>
                <!--                                <th width="150">类型</th>-->
                <th width="150">操作</th>
              </tr>
            </table>
            <table class="tabBody" style="margin-top: -1px;">
              <draggable v-model="leftTab" animation="500" force-fallback="true" handle=".move" @start="onStart"
                @end="onEnd" :move="checkMove">
                <tr v-for="(item) in leftTab" :key="item.id">
                  <td width="200">
                    <el-input v-model.trime="item.value" class="tInput" placeholder="输入名称"></el-input>
                  </td>
                  <!--                                    <td width="150">-->
                  <!--                                        字符串-->
                  <!--                                    </td>-->
                  <td width="150" :id="'left' + item.id">
                    <span class="btn delBtn" @click="handleDelItemData(item)">删除</span>
                    <span class="btn dragBtn move"></span>
                  </td>
                </tr>
              </draggable>
            </table>
          </div>
          <el-button type="primary" size="small" class="addItemBtn" @click="handleAddItemData">
            + 行
          </el-button>
        </div>
        <div class="data dataStart">
          <div class="dataTitle">
            <span class="title">
              右边内容
            </span>
          </div>
          <div class="tab">
            <table class="tabBody">
              <tr>
                <th>demo_aa</th>
              </tr>
              <tr v-for="(item) in rightTab" :key="item.id">
                <td :id="'right' + item.id">{{ item.value }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPlumb from 'jsplumb'; // 可拉伸指示箭头,可用于映射图标
import draggable from 'vuedraggable' //导入draggable组件
let plumbIns = jsPlumb.jsPlumb.getInstance({
  ConnectionsDetachable: true, //连线是否可用鼠标分离
  ReattachConnections: true, //是否重新连接使用鼠标分离的线
  //父级元素id；假如页面元素所在上层不同，最外层父级一定要设置
  Container: "module",
  // DragOptions : { cursor: "pointer", zIndex:2000 },//拖动的时候
  PaintStyle: {
    stroke: '#BCBCBC'
  }, // 默认悬停样式  默认为null
  HoverPaintStyle: {
    stroke: '#1E90FF'
  }, // 默认悬停样式  默认为null
  EndpointStyle: {
    fill: '#BCBCBC',
    radius: 5
  },
  EndpointHoverStyle: {
    fill: '#1E90FF',
    radius: 5
  }, // 端点悬停样式
  Rectangle: {

  },
});
let common = null;
export default {
  name: 'demo1',
  components: {
    draggable
  },
  data() {
    return {
      leftTab: [
        { id: 1, code: 1, sourceId: 1, targetId: 1, value: '111', name: '111', type: 1 },
        { id: 2, code: 2, sourceId: 2, targetId: 2, value: '222', name: '222', type: 2 },
        { id: 3, code: 3, sourceId: 3, targetId: 3, value: '333', name: '333', type: 3 },
      ],
      rightTab: [
        { id: 4, code: 4, sourceId: 4, targetId: 4, value: 'aaa', name: 'aaa', type: 'aaa' },
        { id: 5, code: 5, sourceId: 5, targetId: 5, value: 'bbb', name: 'bbb', type: 'bbb' },
        { id: 6, code: 6, sourceId: 6, targetId: 6, value: 'ccc', name: 'ccc', type: 'ccc' },
      ],
      pointList: [
        { sourceId: 4, targetId: 1, },
        { sourceId: 4, targetId: 2, }
      ],

      drag: false, // 上下拖拽列表顺序
    }
  },
  watch: {
    leftTab(nVal, oVal) {
      // 设置连接点
      this.setLinkPoint()
      // 设置默认连线
      this.setDefaultLine();
      // 连线前的判断
      this.beforeDrop();
    },
  },
  methods: {
    // 设置连接点
    setLinkPoint() {
      plumbIns.reset(); // 清除后再跟进后台传过来的值画线
      this.$nextTick(() => {
        // addEndpoint: 增加端点，第一个参数是ID
        this.leftTab.forEach(item => {
          plumbIns.addEndpoint('left' + item.id, {
            anchors: ['Right'],
            uuid: 'left' + item.id
          }, common)
        });
        this.rightTab.forEach(item => {
          plumbIns.addEndpoint('right' + item.id, {
            anchors: ['Left'],
            uuid: 'right' + item.id
          }, common)
        });
      });
    },
    // 连线前的判断
    beforeDrop() {
      // 连线前规则,返回true符合规则,不返回或者返回false,不符合规则
      plumbIns.bind('beforeDrop', (info) => {
        // info是该线段的基本信息  sourceId是线头节点id，targetId是线尾节点id
        if (info.sourceId == info.targetId) { // 判断是否是同一节点
          return false;
        }
        // 必须是右边连接左边
        if (info.targetId.indexOf('left') === -1) {
          return false;
        }
        // 左边不可以连接右边
        if (info.sourceId.indexOf('right') === -1) {
          return false;
        }
        let sourceId = info.sourceId; // 起点
        let targetId = info.targetId // 目标点
        let sourceKey = info.connection['endpoints'][0].anchor.type // 连接的位置获取
        let targetKey = info.dropEndpoint.anchor.type // 连接的位置获取
        let pointList = JSON.parse(JSON.stringify(this.pointList));
        console.log(pointList);
        for (let i = 0; i < pointList.length; i++) {
          let item = pointList[i];
          if (('right' + item.sourceId) === sourceId && ('left' + item.targetId) === targetId) {
            return false;
          };
        }

        pointList.push({
          sourceId: Number(sourceId.replace('right', '')),
          targetId: Number(targetId.replace('left', '')),
        });
        this.pointList = pointList;
        console.log('pointList', this.pointList);
        return true;
      });
    },
    // 设置默认连线
    setDefaultLine() {
      plumbIns.reset(); // 清除后再跟进后台传过来的值画线
      this.$nextTick(() => {
        this.pointList.forEach((item, index) => {
          plumbIns.connect({ uuids: ['right' + item.sourceId, 'left' + item.targetId] }, common);
        });
      });
    },
    checkMove(evt) {
      return true;
    },
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
    // 删除数据模型列表内容
    handleDelItemData(val) {
      console.log('删除列');
      let leftTab = JSON.parse(JSON.stringify(this.leftTab));
      for (let i = 0; i < this.leftTab.length; i++) {
        let item = this.leftTab[i];
        if (item.id === val.id) {
          // 删除列表中的连线关系
          this.pointList = this.pointList.filter(cItem => cItem.targetId !== val.targetId);
          this.leftTab.splice(i, 1);
        }
      }
    },
    // 新增左边列表内容
    handleAddItemData() {
      console.log('新增列');
      let num = this.leftTab[this.leftTab.length - 1].id + 1;
      let item = { id: num, sourceId: num, targetId: num, value: '', type: 1 };
      let nullFlag = false;
      this.leftTab.forEach((item, index) => {
        if (!item.value) {
          this.$message.error('字段名称不能为空');
          nullFlag = true;
        }
      });
      if (!nullFlag) {
        this.leftTab.push(item);
      }
    },
  },
  created() {
    let that = this;
    common = {
      isSource: true,
      isTarget: true,
      endpoint: ['Dot', {
        radius: 5,
        fill: '#ff5722'
      }], // 端点的形状
      maxConnections: -1,
      connector: ['Straight', {
        gap: 2,
        cornerRadius: 5,
        alwaysRespectStubs: true
      }], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
      connectorOverlays: [
        ['Arrow', {
          width: 10,
          length: 10,
          location: 1
        }],
        [
          "Label",
          {
            location: 0.3,
            label: "",
            visible: true,
            id: "label",
            labelStyle: {
              color: '#FFF'
            },
            cssClass: "aLabel",
            events: {
              tap(labelOverlay, originalEvent) {
                // console.log('删除当前映射线 :', that.pointList, labelOverlay.component.sourceId, labelOverlay.component.targetId);
                let sourceId = labelOverlay.component.sourceId; // 起点
                let targetId = labelOverlay.component.targetId // 目标点
                // 删除列表中的连线关系
                for (let i = 0; i < that.pointList.length; i++) {
                  let item = that.pointList[i];
                  if (('right' + item.sourceId) === sourceId && ('left' + item.targetId) === targetId) {
                    that.pointList.splice(i, 1);
                  };
                }
                plumbIns.deleteConnection(labelOverlay.component); // 删除当前映射线
              }
            }
          }
        ]
      ]
    };
  },
  mounted() {
    plumbIns.ready(() => {
      plumbIns.setContainer('module');

      // 设置连接点
      this.setLinkPoint();
      // 设置默认连线
      this.setDefaultLine();
      // 连线前的判断
      this.beforeDrop();
      // 断开连接线触发
      // plumbIns.bind("connectionDetached", (info) => {
      //     console.log('断开连接');
      // });


    });
  }
}
</script>

<style scoped>
#wrap {
  position: relative;
  /* 加上这句，防止连线位置发生错乱 */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 15px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}

/* 头部 */
.head {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.head .title {
  position: relative;
  margin: 10px 0;
  color: #999;
}

.head .title::before {
  float: left;
  display: inline-block;
  content: ' ';
  margin: 3px 10px 0 0;
  width: 5px;
  height: 16px;
  background-color: #1ABC9C;
}

/* 内容 */
.content {
  flex-grow: 1;
  position: relative;
  margin: 15px 0 0;
  padding: 20px 20px 100px 20px;
  box-sizing: border-box;
  background-color: #FFF;
}

.content .row {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  color: #333;
  font-size: 14px;
}

.content .thead {
  align-items: center;
}

.thead .formLabel {
  display: inline-block;
  margin-right: 10px;
  color: #333;
  font-weight: bold;
}

.thead .input {
  display: inline-block;
  margin-right: 62px;
  width: 300px;
}

.thead .select {
  display: inline-block;
  width: 150px;
}

.content .dataCont {
  position: relative;
  margin-top: 30px;
  justify-content: space-between;
}

.dataCont .data {}

.data .dataTitle {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 100%;
}

.data .dataTitle .title {
  font-weight: bold;
  font-size: 16px;
}

.data .tab {}

.data .addItemBtn {
  margin-top: 15px;
}

.data .tab .tabHead {}

.data .tab table {
  border-collapse: collapse;
}

.tab table th {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #AAA;
  background-color: #F2F2F2;
}

.tab table td {
  position: relative;
  height: 40px;
  line-height: 40px;
  border: 1px solid #AAA;
  vertical-align: middle;
}

::v-deep .tab .tInput .el-input__inner {
  border: none;
}

::v-deep .tab .tSelect .el-input__inner {
  border: none;
}

.tab .btn {
  display: inline-block;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  opacity: 1.0;
}

.tab .btn:hover {
  opacity: .9;
}

.tab .btn .fixedMsg {
  margin-left: 10px;
  color: #CCC;
}

.tab .delBtn {
  margin-left: 15px;
  color: #FFF;
  background-color: #FF5722;
}

.tab .dragBtn {
  position: absolute;
  top: 6px;
  right: 20px;
  padding: 0;
  width: 24px;
  height: 28px;
  cursor: move;
  /*background: url(../../public/images/dragend.svg) no-repeat center center;*/
  background-size: 100% 100%;
}

.dataCont .dataModelBox {}

/* 数据源列表 */
.dataCont .dataStart {
  width: 400px;
}

.dataStart .dataTitle .dSelect {
  width: 180px;
}

::v-deep .dataStart .dataTitle .dSelect .el-input__inner {
  border: none;
}

.dataStart table {
  width: 100%;
}

.dataStart table th,
.dataStart table td {
  padding: 0 15px;
  text-align: left;
}

.content .groupBtn {
  position: absolute;
  bottom: 20px;
}

::v-deep .aLabel {
  display: inline-block;
  width: 8px;
  height: 8px;
  line-height: 8px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 50%;
  border: 1px solid #BCBCBC;
  background: #BCBCBC;
  background-size: 100% 100%;
}

::v-deep .aLabel:hover {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  border: 1px solid #DC143C;
  /*background: url(../../public/images/lineDel.svg) #DC143C no-repeat center center;*/
  background-size: 100% 100%;
}
</style>
