<template>
  <div style="padding: 20px;">
    <h1 style="text-align: center;">横道图</h1>
    <div class="barchart">
      <el-table :data="tableData" :span-method="objectSpanMethod" border>
        <el-table-column fixed align="center" prop="name" label="阶段名称" width="100" key="-1">
        </el-table-column>
        <el-table-column fixed align="center" prop="state" label="状态" width="80" key="-2">
          <template slot-scope="scope">
            <span v-if="scope.$index % 2 === 0">计划工期</span>
            <span v-else>实际工期</span>
          </template>
        </el-table-column>
        <el-table-column fixed align="center" prop="beginDate" label="开始时间" width="100" key="-3">
          <template slot-scope="scope">
            <span>{{ scope.row.beginDate }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed align="center" prop="endDate" label="结束时间" width="100" key="-4">
          <template slot-scope="scope">
            <span>{{ scope.row.endDate }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed align="center" prop="days" label="工期(天)" width="100" key="-5">
        </el-table-column>
        <!-- 渲染时间(年|月) -->
        <el-table-column v-if="IsShowyear" v-for="(item, index) in showMonths" :label="item.year" prop="showMonths"
          align="center" :key="index">
          <el-table-column v-for="(it, index1) in item.months" :label="it.str" prop="str" min-width="30"
            style="padding: 0; margin: 0;" align="center" :key="index1">
            <template slot-scope="scope" class="progressCon">
              <div v-if="getCellDateWidth > 0">
                <div v-if="index === 0 && index1 === 0 && scope.$index % 2 === 0" class="progressUpon"
                  :style="{ width: optimizeCalcWidth(scope.row), left: optimizeCalcLeft(scope.row) }"></div>
                <div v-else-if="index === 0 && index1 === 0 && scope.$index % 2 !== 0" class="progressDownon"
                  :style="{ width: optimizeCalcWidth(scope.row), left: optimizeCalcLeft(scope.row) }"></div>
              </div>
              <div v-else>
                <div v-if="scope.$index % 2 === 0"
                  :class="scope.row.beginTimeStamp <= it.endTimeStamp && scope.row.endTimeStamp >= it.beginTimeStamp ? 'progressUpon' : ''"
                  :style="{ width: scope.row.beginTimeStamp <= it.endTimeStamp && scope.row.endTimeStamp >= it.beginTimeStamp ? calcwidth(scope.row, it) : '0px', left: scope.row.beginTimeStamp <= it.endTimeStamp && scope.row.endTimeStamp >= it.beginTimeStamp ? calcLeft(scope.row, it) : '0px' }">
                </div>
                <div v-else
                  :class="scope.row.beginTimeStamp <= it.endTimeStamp && scope.row.endTimeStamp >= it.beginTimeStamp ? 'progressDownon' : ''"
                  :style="{ width: scope.row.beginTimeStamp <= it.endTimeStamp && scope.row.endTimeStamp >= it.beginTimeStamp ? calcwidth(scope.row, it) : '0px', left: scope.row.beginTimeStamp <= it.endTimeStamp && scope.row.endTimeStamp >= it.beginTimeStamp ? calcLeft(scope.row, it) : '0px' }">
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- 渲染时间(月|日) -->
        <el-table-column v-if="!IsShowyear" v-for="(item, index) in showMonths" :label="item.year" prop="year"
          align="center" :key="index">
          <el-table-column v-for="(it, index1) in item.months" :label="it.str" prop="str" style="padding: 0; margin: 0;"
            align="center" :key="index1">
            <el-table-column v-for="(itm, index2) in item.days[index1].daysArr" :label="itm.day" prop="day" min-width="30"
              style="padding: 0; margin: 0;" align="center" :key="index2">
              <template slot-scope="scope" class="progressCon">
                <div v-if="getCellDateWidth > 0">
                  <div v-if="index === 0 && index1 === 0 && index2 === 0 && scope.$index % 2 === 0" class="progressUpon"
                    :style="{ width: optimizeCalcWidth(scope.row), left: optimizeCalcLeft(scope.row) }"></div>
                  <div v-else-if="index === 0 && index1 === 0 && index2 === 0 && scope.$index % 2 !== 0"
                    class="progressDownon" :style="{ width: optimizeCalcWidth(scope.row), left: optimizeCalcLeft(scope.row) }">
                  </div>
                </div>
                <div v-else>
                  <div v-if="scope.$index % 2 === 0"
                    :class="scope.row.beginTimeStamp <= itm.timestamp && scope.row.endTimeStamp >= itm.timestamp ? 'progressUpon' : ''"
                    style="width:calc(100% + 2px)"></div>
                  <div v-else
                    :class="scope.row.beginTimeStamp <= itm.timestamp && scope.row.endTimeStamp >= itm.timestamp ? 'progressDownon' : ''"
                    style="width:calc(100% + 2px)"></div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Barchart',
  data() {
    return {
      showMonths: [],
      tableData: [],
      minDay: "", // 最小日期
      maxDay: "", // 最大日期
      IsShowyear: true // 显示年|月 、 月|日
    }
  },
  computed: {
    // 获取最小日期-月开始时间戳
    minDayTimeStamp() {
      if (this.IsShowyear) {
        return this.showMonths[0].months[0].beginTimeStamp
      } else {
        return this.showMonths[0].days[0].daysArr[0].timestamp
      }
    },
    // 获取最大日期时间戳
    maxDayTimeStamp() {
      let Length = this.showMonths.length // 年有多少个
      // 如果显示年|月 与 月|日 是不同的
      if (this.IsShowyear) {
        let monthsLength = this.showMonths[Length - 1].months.length  //月有多少个
        return this.showMonths[Length - 1].months[monthsLength - 1].endTimeStamp
      } else {
        let daysLength = this.showMonths[Length - 1].days.length
        let daysarrLength = this.showMonths[Length - 1].days[daysLength - 1].daysArr.length  //天有多少个
        return this.showMonths[Length - 1].days[daysLength - 1].daysArr[daysarrLength - 1].timestamp + 86400000  //+86400000 是因为时间戳都是0点这样+1天的时间戳，就表示最晚一天的最后的时间
      }
    },
    // 最大日期与最小日期的时间戳差
    maxAndminDayTimeStamp() {
      return this.maxDayTimeStamp - this.minDayTimeStamp
    },
    // 获取日期单元格宽度 => 如果返回0则只用之前第一版的计算方法
    getCellDateWidth() {
      let num = 0 // 获取日期单元格数量
      if (this.IsShowyear) {
        // 月数量
        for (let i = 0; i < this.showMonths.length; i++) {
          num += this.showMonths[i].months.length
        }
      } else {
        // 天数量
        for (let i = 0; i < this.showMonths.length; i++) {
          for (let j = 0; j < this.showMonths[i].days.length; j++) {
            num += this.showMonths[i].days[j].daysArr.length
          }
        }
      }

      // 每个单元格最小30宽度
      let MaxWidth = window.screen.width
      let CellNum = MaxWidth / 30 > 0 ? MaxWidth / 30 : 0
      if (num >= CellNum) { // 页面宽 / 单元格最小宽度 = 最多放下的值
        return num * 30
      } else {
        // 单元格的值，就不能是最小值30了
        // 需要获取dom的宽度，在进行计算，但是dom还未渲染完成，因此这里就不考虑了，直接只用第一版的方法动态计算
        // TODO
        return 0
      }

    }
  },
  created() {
    // 这里可以发送请求
    this.tableData = [{
      "id": 1,
      "name": "王小虎2",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-30",
      "days": "1000"
    }, {
      "id": 1,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-15",
      "endDate": "2016-05-22",
      "days": "1000"
    }, {
      "id": 2,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-20",
      "days": "1000"
    }, {
      "id": 2,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-20",
      "days": "1000"
    }, {
      "id": 3,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-02",
      "days": "1000"
    }, {
      "id": 3,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-02",
      "days": "1000"
    }, {
      "id": 4,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-15",
      "endDate": "2016-05-22",
      "days": "1000"
    }, {
      "id": 4,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-15",
      "endDate": "2016-05-22",
      "days": "1000"
    }, {
      "id": 5,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-20",
      "days": "1000"
    }, {
      "id": 5,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-20",
      "days": "1000"
    }, {
      "id": 6,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-02",
      "days": "1000"
    }, {
      "id": 6,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-02",
      "days": "1000"
    }, {
      "id": 7,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-15",
      "endDate": "2016-05-22",
      "days": "1000"
    }, {
      "id": 7,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-15",
      "endDate": "2016-05-22",
      "days": "1000"
    }, {
      "id": 8,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-20",
      "days": "1000"
    }, {
      "id": 8,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-20",
      "days": "1000"
    }, {
      "id": 9,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-02",
      "days": "1000"
    }, {
      "id": 9,
      "name": "王小虎3",
      "state": "计划工期",
      "beginDate": "2016-05-01",
      "endDate": "2016-05-02",
      "days": "1000"
    }]
    this.setrowspans() // 设置合并
    this.getChartTitle() // 渲染的信息
  },
  methods: {
    optimizeCalcWidth(val) {
      let SumNum = this.maxAndminDayTimeStamp
      let diffNum = this.IsShowyear ? val.endTimeStamp - val.beginTimeStamp : val.endTimeStamp + 84600000 - val.beginTimeStamp  // 结束日期 - 开始日期
      let rate = Math.round(diffNum / SumNum * 10000) / 100.00 //得到百分比
      let widthPx = this.getCellDateWidth * rate / 100.00
      return widthPx + 'px'
    },
    optimizeCalcLeft(val) {
      let SumNum = this.maxAndminDayTimeStamp
      let diffNum = val.beginTimeStamp - this.minDayTimeStamp // 开始日期 - 整个月开始日期
      let rate = Math.round(diffNum / SumNum * 10000) / 100.00 //得到百分比
      let leftPx = this.getCellDateWidth * rate / 100.00
      return leftPx + 'px'
    },
    // 计算图表的Left
    calcLeft(val, date) {
      // 如果本月的最大时间戳都没有结束时间长，那么就可判断
      if (val.endTimeStamp > date.endTimeStamp) {
        // 如果本月开始日期小于开始日期
        if (val.beginTimeStamp > date.beginTimeStamp) {
          // 进行判断
          let diffNum = val.beginTimeStamp - date.beginTimeStamp
          let SumNum = date.endTimeStamp - date.beginTimeStamp
          let rate = 100 - Math.round(diffNum / SumNum * 10000) / 100.00
          // 位置判断
          return rate + "%"
        }
      } else if (val.endTimeStamp > date.beginTimeStamp && val.endTimeStamp < date.endTimeStamp) {
        // 进行判断
        if (val.beginTimeStamp > date.beginTimeStamp) {
          // 都在一个单元格中
          let diffNum = val.beginTimeStamp - date.beginTimeStamp
          let SumNum = date.endTimeStamp - date.beginTimeStamp
          let rate = Math.round(diffNum / SumNum * 10000) / 100.00
          // 位置判断
          return rate + "%"
        }
      }
      return '0px'
    },
    // 计算图表的Width
    calcwidth(val, date) {
      if (this.IsShowyear) {
        // 如果是 年|月
        // 1. 如果本月的最大时间戳都没有结束时间长，那么就可设置100%
        // 2. 如果本月的最小时间戳比结束时间长，那么设置0
        // 3. 如果本月的最小时间戳没有结束时间长，那么进行判断
        if (val.endTimeStamp > date.endTimeStamp) {
          // 如果本月开始日期小于开始日期
          if (val.beginTimeStamp > date.beginTimeStamp) {
            // 进行判断
            let diffNum = val.beginTimeStamp - date.beginTimeStamp
            let SumNum = date.endTimeStamp - date.beginTimeStamp
            let rate = Math.round(diffNum / SumNum * 10000) / 100.00
            return 'calc(' + rate + '% + 2px)' // 结束时间超过本月最大时间戳直接+2px
          }
          return 'calc(100% + 2px)'
        } else if (val.endTimeStamp < date.beginTimeStamp) {
          return '0px'
        } else if (val.endTimeStamp > date.beginTimeStamp && val.endTimeStamp < date.endTimeStamp) {
          // 进行判断
          if (val.beginTimeStamp > date.beginTimeStamp) {
            // 都在一个单元格中
            let SumNum = date.endTimeStamp - date.beginTimeStamp // 全月多少数
            let diffNum = val.endTimeStamp - val.beginTimeStamp // 过程多少数
            diffNum = diffNum === 0 ? 86400000 : diffNum
            let rate = Math.round(diffNum / SumNum * 10000) / 100.00
            return 'calc(' + rate + '%)'
          } else {
            // 不在一个单元格中，则不需要判断任何信息
            let diffNum = val.endTimeStamp - date.beginTimeStamp
            let SumNum = date.endTimeStamp - date.beginTimeStamp
            let rate = Math.round(diffNum / SumNum * 10000) / 100.00
            return 'calc(' + rate + '%)'
          }
        }
      } else {
        // 如果是 月|日
        // 1.如果开始时间大于 天的时间戳，则为0
        // 2.如果结束时间小于 天的时间戳，则为100%
        if (val.beginTimeStamp > date.timestamp) {
          return '0px'
        } else if (val.beginTimeStamp < date.timestamp && val.endTimeStamp > date.timestamp) {
          return 'calc(100% + 2px)'
        }
      }
      return '0px'
    },
    //获得数据相同的行数(网络复制)
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: 1
        };
      }
    },
    // 根据id去分组(网络复制)
    setrowspans() {
      // 先给所有的数据都加一个v.rowspan = 1
      this.tableData.forEach(v => {
        v.rowspan = 1;
      });
      // 双层循环
      for (let i = 0; i < this.tableData.length; i++) {
        // 内层循环，上面已经给所有的行都加了v.rowspan = 1
        // 这里进行判断
        // 如果当前行的id和下一行的id相等
        // 就把当前v.rowspan + 1
        // 下一行的v.rowspan - 1
        for (let j = i + 1; j < this.tableData.length; j++) {
          //此处可根据相同字段进行合并，此处是根据的id
          if (this.tableData[i].id === this.tableData[j].id) {
            this.tableData[i].rowspan++;
            this.tableData[j].rowspan--;
          }
        }
        // 这里跳过已经重复的数据
        i = i + this.tableData[i].rowspan - 1;
      }
    },
    // 渲染表格头，首先是年月，如2018年11月
    getChartTitle(startDate, endDate) {
      var chartTable = this.tableData;
      // 准备日期，为了防止多次赋值属性，导致计算属性重新计算，决定只赋值一次
      let maxDayParams = "", minDayParams = ""

      for (var i = 0; i < chartTable.length; i++) {

        var StartDate = chartTable[i].beginDate;
        var EndDate = chartTable[i].endDate;
        var mainObj = chartTable[i];


        // 计划日期
        maxDayParams === "" ? maxDayParams = EndDate : ''
        minDayParams === "" ? minDayParams = StartDate : ""
        maxDayParams = this.compareDate(EndDate, maxDayParams, true)
        minDayParams = this.compareDate(StartDate, minDayParams, false)
        var days = this.GetNumberOfDays(StartDate, EndDate) // 计算工期
        this.tableData[i].days = days + 1 // 加一是因为没算结算当天
        // 记录时间戳
        this.tableData[i].beginTimeStamp = this.getTimeStamp(StartDate)
        this.tableData[i].endTimeStamp = this.getTimeStamp(EndDate)

      }
      this.minDay = minDayParams
      this.maxDay = maxDayParams
      console.log("小：" + this.minDay)
      console.log("大：" + this.maxDay)

      this.getYearArr()
      console.log(this.showMonths)

    },

    // 获取需要的格式的年月日信息
    getYearArr() {
      // 如果有一个日期相差超过366天，按照年，不超过则按天
      var days = this.GetNumberOfDays(this.minDay, this.maxDay)
      if (days >= 365) {
        //需要记录月份
        this.IsShowyear = true
      } else {
        //需要记录天数
        this.IsShowyear = false
      }
      // 获取需要格式的年月信息
      let yearArr = []; // 存年

      let minYear = new Date(this.minDay).getFullYear();
      let maxYear = new Date(this.maxDay).getFullYear();
      // 保存年
      if (minYear === maxYear) {
        yearArr.push({
          year: minYear + "",
          months: [],        // 放月的数组
          days: []
        })
      } else {
        for (let i = minYear; i <= maxYear; i++) {
          yearArr.push({
            year: i + "",
            months: [],        // 放月的数组
            days: []
          })
        }
      }
      // 保存月
      for (let i = 0; i < yearArr.length; i++) {
        let minMonth = 1
        if (i === 0) {
          minMonth = new Date(this.minDay).getMonth() + 1;
        }
        // 1.eg：2016年9月 至 2019年01月
        // 2.如果只有一个年，那么月份就是最小月到最大月
        if (yearArr.length > 1) {
          // 如果是最后一年，那么就要判断是否到最后一个月
          if (yearArr.length - 1 === i) {
            let maxMonth = new Date(this.maxDay).getMonth() + 1;
            let _maxDay = new Date(this.maxDay).getDate() // 最大日期 天数
            let j = 1
            while (j <= maxMonth) {
              let monthsDays = this.getLastDay(yearArr[i].year, j); // 获取月份一共有多少天
              let timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-" + monthsDays)
              let timestampstr1 = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-01")
              yearArr[i].months.push({ str: j + "月", num: j, endTimeStamp: timestampstr, beginTimeStamp: timestampstr1 });// 记录最大最小的时间戳
              // 如果显示月|天 才用记录天
              if (!this.IsShowyear) {
                yearArr[i].days[yearArr[i].days.length] = { year: "", month: "", daysArr: {} }
                yearArr[i].days[yearArr[i].days.length - 1].year = yearArr[i].year    // 赋值年
                yearArr[i].days[yearArr[i].days.length - 1].month = j;    // 赋值月
                yearArr[i].days[yearArr[i].days.length - 1].daysArr = []
                // 如果结束月，不是到本月最后一天，而是截止到最
                if (j === maxMonth) {
                  monthsDays = _maxDay
                }
                for (let k = 1; k <= monthsDays; k++) {
                  timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-" + (k > 9 ? k : '0' + k))
                  yearArr[i].days[yearArr[i].days.length - 1].daysArr.push({ day: k + "", timestamp: timestampstr });// 赋值天
                }
              }
              j++
            }
          } else {
            if (i === 0) {
              let j = minMonth
              let _minDay = new Date(this.minDay).getDate() // 最小日期 天数

              while (j <= 12) {
                let monthsDays = this.getLastDay(yearArr[i].year, j); // 获取月份一共有多少天
                let timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-" + monthsDays)
                let timestampstr1 = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-01")
                yearArr[i].months.push({ str: j + "月", num: j, endTimeStamp: timestampstr, beginTimeStamp: timestampstr1 });// 记录最大最小的时间戳
                // 如果显示月|天 才用记录天
                if (!this.IsShowyear) {
                  yearArr[i].days[yearArr[i].days.length] = { year: "", month: "", daysArr: {} }
                  yearArr[i].days[yearArr[i].days.length - 1].year = yearArr[i].year    // 赋值月
                  yearArr[i].days[yearArr[i].days.length - 1].month = j     // 赋值月
                  yearArr[i].days[yearArr[i].days.length - 1].daysArr = []
                  for (let k = 1; k <= monthsDays; k++) {
                    // 如果开始月，就不从1日开始，而是从最开始的日期那天开始算起
                    if (k === 1 && j === minMonth) {
                      k = _minDay
                    }
                    timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-" + (k > 9 ? k : '0' + k))
                    yearArr[i].days[yearArr[i].days.length - 1].daysArr.push({ day: k + "", timestamp: timestampstr });// 赋值天
                  }
                }
                j++
              }
            } else {
              let j = 1
              while (j <= 12) {
                let monthsDays = this.getLastDay(yearArr[i].year, j); // 获取月份一共有多少天
                let timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-" + monthsDays)
                let timestampstr1 = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-01")
                yearArr[i].months.push({ str: j + "月", num: j, endTimeStamp: timestampstr, beginTimeStamp: timestampstr1 });// 记录最大最小的时间戳
                // 如果显示月|天 才用记录天
                if (!this.IsShowyear) {
                  yearArr[i].days[yearArr[i].days.length] = { year: "", month: "", daysArr: {} }
                  yearArr[i].days[yearArr[i].days.length - 1].year = yearArr[i].year    // 赋值年
                  yearArr[i].days[yearArr[i].days.length - 1].month = j // 赋值月
                  yearArr[i].days[yearArr[i].days.length - 1].daysArr = []
                  for (let k = 1; k <= monthsDays; k++) {
                    timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (j > 9 ? j : '0' + j) + "-" + (k > 9 ? k : '0' + k))
                    yearArr[i].days[yearArr[i].days.length - 1].daysArr.push({ day: k + "", timestamp: timestampstr });// 赋值天
                  }
                }
                j++
              }
            }

          }
        } else {
          // 如果只有一年那么没有必要判断是否记录天
          let maxMonth = new Date(this.maxDay).getMonth() + 1;
          let _minMonth = minMonth
          let _minDay = new Date(this.minDay).getDate() // 最小日期 天数
          let _maxDay = new Date(this.maxDay).getDate() // 最大日期 天数
          while (_minMonth <= maxMonth) {
            let monthsDays = this.getLastDay(yearArr[i].year, _minMonth); // 获取月份一共有多少天
            let timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (_minMonth > 9 ? _minMonth : '0' + _minMonth) + "-" + monthsDays)
            let timestampstr1 = this.getTimeStamp(yearArr[i].year + "-" + (_minMonth > 9 ? _minMonth : '0' + _minMonth) + "-01")
            yearArr[i].months.push({ str: _minMonth + "月", num: _minMonth, endTimeStamp: timestampstr, beginTimeStamp: timestampstr1 });// 记录最大最小的时间戳
            yearArr[i].days[yearArr[i].days.length] = { year: "", month: "", daysArr: {} }
            yearArr[i].days[yearArr[i].days.length - 1].year = yearArr[i].year     // 赋值月
            yearArr[i].days[yearArr[i].days.length - 1].month = _minMonth    // 赋值月
            yearArr[i].days[yearArr[i].days.length - 1].daysArr = []
            // 如果结束月，不是到本月最后一天，而是截止到最
            if (_minMonth === maxMonth) {
              monthsDays = _maxDay
            }
            for (let k = 1; k <= monthsDays; k++) {
              // 如果开始月，就不从1日开始，而是从最开始的日期那天开始算起
              if (k === 1 && _minMonth === minMonth) {
                k = _minDay
              }
              timestampstr = this.getTimeStamp(yearArr[i].year + "-" + (_minMonth > 9 ? _minMonth : '0' + _minMonth) + "-" + (k > 9 ? k : '0' + k))
              yearArr[i].days[yearArr[i].days.length - 1].daysArr.push({ day: k + "", timestamp: timestampstr });// 赋值天
            }
            _minMonth++
          }
        }
      }
      this.showMonths = yearArr

    },

    // 获取月的最后一天
    getLastDay(myyear, mymonth) {
      var new_date = new Date(myyear, mymonth, 0);
      return new_date.getDate();
    },

    // 获得天数
    GetNumberOfDays(date1, date2) {
      //date1：开始日期，date2结束日期
      var a1 = Date.parse(new Date(date1));
      var a2 = Date.parse(new Date(date2));
      var day = parseInt((a2 - a1) / 86400000);//核心：时间戳相减，然后除以天数
      return day
    },
    // 时间比较 true 比大
    compareDate(dateTime1, dateTime2, condition = true) {
      var formatDate1 = new Date(dateTime1)
      var formatDate2 = new Date(dateTime2)
      if (formatDate1 >= formatDate2) {
        return condition ? dateTime1 : dateTime2
      }
      else {
        return condition ? dateTime2 : dateTime1
      }
    },
    // 获取时间戳
    getTimeStamp(val) {
      return new Date(val).getTime()
    },
  },
}
</script>


<style>
/* 边框粗一点 */
.barchart .el-table--border td,
.barchart .el-table--border th {
  border-width: 2px;
}

/* 单元格padding */
.barchart .el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  padding: 0px;
}

.barchart .el-table th>.cell {
  padding: 0px;
}

/* 单元格高度 */
.barchart .el-table--medium th,
.barchart .el-table--medium td {
  padding: 0px 0px !important;
  height: 25px !important;
}

.barchart .progressCon {
  padding: 0;
  margin: 0;
  position: relative;
}

.barchart .progressUpon {
  background: rgb(38, 84, 124);
  height: 1em;
  /* width: calc(100% + 2px); // +2是因为边框线为2px*/
  z-index: 2;
  position: absolute;
  top: 25%;
  left: 0px
}

.barchart .progressDownon {
  background: rgb(255, 209, 102);
  height: 1em;
  /* width: calc(100% + 2px); // +2是因为边框线为2px*/
  z-index: 2;
  position: absolute;
  top: 25%;
  left: 0px
}
</style>