<template>
    <div class="hotelApply wl-gantt">
        <el-card>
            <el-table :data="tableData" border style="width: 100%" :class="dateTypeClass" row-key="id"
                :span-method="spanMethod" @cell-click="cellClick" :cell-style="cellStyle">
                <el-table-column prop="room" label="房间" align="center" width="140px" fixed="left"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="bedName" label="床位" align="center" width="120px" fixed="left"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <!-- mouth and day gantt -->
                <template v-if="self_date_type === 'monthAndDay'">
                    <el-table-column :resizable="false" v-for="month in ganttTitleDate" :label="month.full_date"
                        :key="month.id" align="center">
                        <el-table-column class-name="wl-gantt-item" v-for="(day, dindex) in month.children"
                            :resizable="false" :key="dindex" :label="day.name" width="60" align="center">
                            <template v-slot="scope">
                                <div :class="dayGanttType(scope.row, day.full_date)" @click="handleDay(scope.row)"></div>
                                <div :class="realDayGanttType(scope.row, day.full_date)"></div>
                                <!-- <div :class="selectedCell(scope.row)"></div> -->
                            </template>
                        </el-table-column>
                    </el-table-column>
                </template>
            </el-table>
        </el-card>
        <!-- 右边抽屉 -->
        <el-drawer title="住房信息" :visible.sync="showDrawer" size='40%'>
            <div class="drawer_box">
                <el-form :model="drawerForm" :inline="true" label-width="100px">
                    <el-form-item label="入住时间">
                        <el-date-picker v-model="drawerForm.beginTime" type="date" placeholder="选择日期"
                            value-format='yyyy-MM-dd' disabled>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="退住时间">
                        <el-date-picker v-model="drawerForm.endTime" type="date" placeholder="选择日期"
                            value-format='yyyy-MM-dd'>
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div style="text-align:center">
                    <el-button type="primary" size="mini" @click="drawerConfirm"> 确定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import dayjs from "dayjs" // 导入日期js
const uuidv4 = require("uuid/v4") // 导入uuid生成插件
import isBetween from "dayjs/plugin/isBetween"
import quarterOfYear from "dayjs/plugin/quarterOfYear"
dayjs.extend(quarterOfYear) //获取季度依赖
dayjs.extend(isBetween)
export default {
    name: "",
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    room: "公寓101",
                    bedName: "1号床",
                    beginTime: "2021-08-03",
                    endTime: "2021-08-4",
                    liveList: [
                        { beginTime: "2021-08-03", endTime: "2021-08-4" },
                        { beginTime: "2021-08-06", endTime: "2021-08-8" },
                    ],
                },
                {
                    id: 2,
                    room: "公寓101",
                    bedName: "2号床",
                    beginTime: "2021-08-04 00:00:00",
                    endTime: "2021-08-5 00:00:00",
                    liveList: [],
                },
                {
                    id: 3,
                    room: "公寓102",
                    bedName: "1号床",
                    beginTime: "2021-08-05 00:00:00",
                    endTime: "2021-08-7 00:00:00",
                    liveList: [],
                },
                {
                    id: 4,
                    room: "公寓102",
                    bedName: "2号床",
                    beginTime: "2021-08-01 00:00:00",
                    endTime: "2021-08-3 00:00:00",
                    liveList: [],
                },
                {
                    id: 5,
                    room: "公寓103",
                    bedName: "1号床",
                    beginTime: "2021-08-06 00:00:00",
                    endTime: "2021-08-8 00:00:00",
                    liveList: [],
                },
                {
                    id: 6,
                    room: "公寓103",
                    bedName: "2号床",
                    beginTime: "2021-08-7 00:00:00",
                    endTime: "2021-08-9 00:00:00",
                    liveList: [],
                },
            ],
            showDrawer: false, //抽屉
            drawerForm: {},
            // 甘特图
            self_start_date: "2021-08-01", // 项目开始时间
            self_end_date: "2021-09-30", // 项目结束时间
            self_start_date_day: "", //项目开始时间的日期
            self_start_date_month: "", //项目开始时间的月份
            self_start_date_year: "", //项目开始时间的年份
            self_date_type: "monthAndDay", // 自身日期类型
        }
    },
    created() { },
    mounted() {
        this.initTime() //初始化时间1
    },
    computed: {
        // 甘特图标题日期分配
        ganttTitleDate() {
            // 分解开始和结束日期
            let start_date_spilt = dayjs(this.self_start_date)
                .format("YYYY-M-D")
                .split("-")
            let end_date_spilt = dayjs(this.self_end_date)
                .format("YYYY-M-D")
                .split("-")
            let start_year = Number(start_date_spilt[0])
            let start_mouth = Number(start_date_spilt[1])
            let end_year = Number(end_date_spilt[0])
            let end_mouth = Number(end_date_spilt[1])
            console.log("日期类型", this.self_date_type)
            if (this.self_date_type === "monthAndDay") {
                return this.mouthAndDayTitleDate(
                    start_year,
                    start_mouth,
                    end_year,
                    end_mouth
                )
            }
        },
        // 树表配置项
        selfProps() {
            return {
                hasChildren: "hasChildren", // 字段来指定哪些行是包含子节点
                children: "children", // children字段来表示有子节点
                name: "name", // 任务名称字段
                id: "id", // id字段
                pid: "pid", // pid字段
                startDate: "beginTime", // 开始时间字段
                endDate: "endTime", // 结束时间字段
                realStartDate: "recordBeginTime", // 实际开始时间字段
                realEndDate: "recordEndTime", // 实际结束时间字段
                identityId: "identityId",
                parents: "parents",
                pre: "pre", // 前置任务字段【注意：如果使用recordParents，则pre值应是目标对象的identityId字段(可配置)】
                // ...this.props
            }
        },
        // 根据日期类型改样式
        dateTypeClass() {
            if (this.self_date_type === "monthAndDay") {
                return "month-and-day"
            }
            return ""
        },
    },
    components: {},
    methods: {
        // =====================表格事件==================
        // 单元格点击
        cellClick(row, column, cell, event) {
            // console.log(row, column, cell, event);
        },
        // 单元格样式
        cellStyle({ row, column, rowIndex, columnIndex }) { },
        // 预定者点击
        handleDay(row) {
            console.log(row)
            this.showDrawer = true
            this.drawerForm = Object.assign({}, row)
        },
        // 模态框确定
        drawerConfirm() {
            this.tableData.forEach((item) => {
                if (item.id == this.drawerForm.id) {
                    this.$set(item, "beginTime", this.drawerForm.beginTime)
                    this.$set(item, "endTime", this.drawerForm.endTime)
                }
            })
            this.showDrawer = false
        },
        // =====================甘特区域==================
        //维度展示形式
        changedateType(val) {
            console.log(val)
            this.getDataList()
        },
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        // 初始化时间
        initTime() {
            this.self_start_date_year = this.self_start_date.split("-")[0]
            this.self_start_date_month = this.self_start_date.split("-")[1]
            this.self_start_date_day = this.self_start_date.split("-")[2]
            this.self_start_date_day =
                this.self_start_date_day > 2
                    ? this.self_start_date_day - 1
                    : this.self_start_date_day
            console.log("开始-结束", this.self_start_date, this.self_end_date)
        },
        // 设置dateType
        setDataType(type) {
            this.self_date_type = type
        },
        /**
         * 当前日期gantt状态
         * row: object 当前行信息
         * date: string 当前格子日期
         * unit: string 时间单位，以天、月、年计算
         */
        dayGanttType(row, date, unit = "days") {
            // let start_date = row[this.selfProps.startDate]
            // let end_date = row[this.selfProps.endDate]
            let start_date = row[this.selfProps.startDate]
            let end_date = row[this.selfProps.endDate]
            // 若没有时间则不显示
            if (!start_date || !end_date) {
                return
            }
            let between = dayjs(date).isBetween(start_date, end_date, unit)
            if (between) {
                return "wl-item-on"
            }
            let start = dayjs(start_date).isSame(date, unit)
            let end = dayjs(end_date).isSame(date, unit)
            if (start && end) {
                return "wl-item-on wl-item-full"
            }
            if (start) {
                return "wl-item-on wl-item-start"
            }
            if (end) {
                return "wl-item-on wl-item-end"
            }
        },
        /**
         * 实际日期gantt状态
         * row: object 当前行信息
         * date: string 当前格子日期
         * unit: string 时间单位，以天、月、年计算
         */
        realDayGanttType(row, date, unit = "days") {
            let start_date = row[this.selfProps.realStartDate]
            let end_date = row[this.selfProps.realEndDate]
            // 若没有实际时间则不显示
            if (!start_date || !end_date) {
                return
            }
            let between = dayjs(date).isBetween(start_date, end_date, unit)
            if (between) {
                return "wl-real-on"
            }
            let start = dayjs(start_date).isSame(date, unit)
            let end = dayjs(end_date).isSame(date, unit)
            if (start && end) {
                return "wl-real-on wl-real-full"
            }
            if (start) {
                return "wl-real-on wl-real-start"
            }
            if (end) {
                return "wl-real-on wl-real-end"
            }
        },
        // 点击选中单元格
        selectedCell(row) { },
        // 以下是表格-日期-gantt生成函数----------------------------------------生成gantt表格-------------------------------------
        /**
         * 月-日模式gantt标题
         * start_year: 起始年
         * start_mouth：起始月
         * end_year：结束年
         * end_mouth：结束月
         */
        mouthAndDayTitleDate(start_year, start_mouth, end_year, end_mouth) {
            // 处理年份
            let year_diff = end_year - start_year
            // 只存在同年或前后年的情况
            if (year_diff === 0) {
                // 年间隔为同一年
                let isLeap = this.isLeap(start_year) // 是否闰年
                let mouths = this.generationMonths(
                    start_year,
                    start_mouth,
                    end_mouth + 1,
                    isLeap
                ) // 处理月份
                return mouths
            }
            // 处理开始月份
            let startIsLeap = this.isLeap(start_year)
            let start_mouths = this.generationMonths(
                start_year,
                start_mouth,
                13,
                startIsLeap
            )
            // 处理结束月份
            let endIsLeap = this.isLeap(end_year)
            let end_mouths = this.generationMonths(
                end_year,
                1,
                end_mouth + 1,
                endIsLeap
            )
            return start_mouths.concat(end_mouths)
        },
        /**
         * 生成月份函数
         * year: Number 当前年份
         * start_num: Number 开始月分
         * end_num：Number 结束月份
         * isLeap: Boolean 是否闰年
         * insert_days: Boolean 是否需要插入 日
         * week: 是否以周的间隔
         */
        generationMonths(
            year,
            start_num = 1,
            end_num = 13,
            isLeap = false,
            insert_days = true,
            week = false
        ) {
            let months = []
            if (insert_days) {
                // 需 日 的模式
                for (let i = start_num; i < end_num; i++) {
                    // 需要 日 的模式
                    let days = this.generationDays(year, i, isLeap, week)
                    months.push({
                        name: `${i}月`,
                        date: i,
                        full_date: `${year}-${i}`,
                        children: days,
                        id: uuidv4(),
                    })
                }
                return months
            }
            for (let i = start_num; i < end_num; i++) {
                // 无需要 日 的模式
                months.push({
                    name: `${i}月`,
                    date: i,
                    full_date: `${year}-${i}`,
                    id: uuidv4(),
                })
            }
            return months
        },
        /**
         * 生成日期函数
         * year: Number 当前年份
         * month: Number 当前月份
         * isLeap: Boolean 是否闰年
         * week: Boolean 是否间隔一周
         */
        generationDays(year, month, isLeap = false, week = false) {
            let big_month = [1, 3, 5, 7, 8, 10, 12].includes(month)
            let small_month = [4, 6, 9, 11].includes(month)
            let dates_num = big_month ? 32 : small_month ? 31 : isLeap ? 30 : 29
            let days = []
            if (week) {
                let _day = 1 // 从周日开始
                let _start_day_inweek = this.timeInWeek(`${year}-${month}-1`)
                if (_start_day_inweek !== 0) {
                    _day = 8 - _start_day_inweek
                }
                for (let i = _day; i < dates_num; i += 7) {
                    days.push({
                        date: i,
                        name: `${i}日`,
                        id: uuidv4(),
                        full_date: `${year}-${month}-${i}`,
                    })
                }
            } else {
                //第一个月
                if (
                    year == this.self_start_date_year &&
                    month == this.self_start_date_month
                ) {
                    for (let i = this.self_start_date_day; i < dates_num; i++) {
                        days.push({
                            date: i,
                            name: `${i}日`,
                            id: uuidv4(),
                            full_date: `${year}-${month}-${i}`,
                        })
                    }
                    //非第一个月
                } else {
                    for (let i = 1; i < dates_num; i++) {
                        days.push({
                            date: i,
                            name: `${i}日`,
                            id: uuidv4(),
                            full_date: `${year}-${month}-${i}`,
                        })
                    }
                }
            }
            return days
        },
        /**
         * 是否闰年函数
         * year: Number 当前年份
         */
        isLeap(year) {
            return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
        },
        // 以下是时间计算类函数 ------------------------------------------------------时间计算---------------------------------------
        /**
         * 时间格式化函数
         * date 需要格式化的数据
         * format 格式化的格式
         */
        timeFormat(date, format = "YYYY-MM-DD") {
            return date ? dayjs(date).format(format) : this.emptyCellText
        },
        /**
         * 查询时间是周几
         */
        timeInWeek(date) {
            return dayjs(date).day()
        },
        // 合并单元格
        spanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const key = "room"

                const list = this.tableData

                let len = list.filter((item) => row[key] === item[key]).length

                let firstIndex = -1
                for (let i = 0; i < this.tableData.length; i++) {
                    const element = this.tableData[i]
                    if (columnIndex === 0 && row[key] === element[key]) {
                        firstIndex = i
                        break
                    }
                }
                if (rowIndex == firstIndex) {
                    return {
                        rowspan: len,
                        colspan: 1,
                    }
                }
                if (rowIndex > firstIndex && rowIndex < firstIndex + len) {
                    return {
                        rowspan: 0,
                        colspan: 0,
                    }
                }
            }
        },
    },
    watch: {},
}
</script>


<style lang="less">
.hotelApply {
    padding-top: 10px;

    .legend-plan,
    .legend-real {
        display: inline-block;
        width: 40px;
        height: 6px;
        border-radius: 3px;
        background: #00cbed;
    }

    .legend-real {
        background: #fcc300;
    }

    .selected-cell {
        border: 1px solid #00cbed;
    }

    .drawer_box {
        padding: 20px;
    }
}
</style>
<style lang="less">
.el-table th.gutter {
    display: table-cell !important;
}

.el-table colgroup.gutter {
    display: table-cell !important;
}

// 鼠标悬浮去除阴影
.el-table tbody tr:hover>td {
    background-color: #fff !important;
}
</style>
<style lang="less">
.wl-gantt {
    .wl-gantt-header>th {
        text-align: center;
    }

    .h-full {
        height: 100%;
    }

    .wl-gantt-item {
        position: relative;
        transition: all 0.3s;

        >.cell {
            padding: 0;
        }
    }

    .u-full.el-input {
        width: 100%;
    }

    // 计划时间gantt开始
    .wl-item-on {
        position: absolute;
        top: 40%;
        left: 0;
        right: -1px;
        margin-top: -4px;
        height: 18px;
        background: #00cbed;
        transition: all 0.4s;
        cursor: pointer;
    }

    .wl-item-start {
        left: 10%;

        &:after {
            position: absolute;
            top: 0;
            left: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #00cbed;
        }
    }

    .wl-item-end {
        right: 10%;

        &:after {
            position: absolute;
            top: 0;
            right: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #00cbed;
        }
    }

    .wl-item-full {
        left: 5px;
        right: 5px;

        &:before {
            position: absolute;
            top: 0;
            left: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #00cbed;
        }

        &:after {
            position: absolute;
            top: 0;
            right: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #00cbed;
        }
    }

    // 计划时间gantt结束

    // 实际时间gantt开始
    .wl-real-on {
        position: absolute;
        top: 75%;
        left: 0;
        right: -1px;
        margin-top: -4px;
        height: 18px;
        background: #fcc300; //rgba(250, 167, 146, .6);
        transition: all 0.4s;
    }

    .wl-real-start {
        left: 50%;

        &:after {
            position: absolute;
            top: 0;
            left: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #fcc300;
        }
    }

    .wl-real-end {
        right: 50%;

        &:after {
            position: absolute;
            top: 0;
            right: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #fcc300;
        }
    }

    .wl-real-full {
        left: 5px;
        right: 5px;

        &:before {
            position: absolute;
            top: 0;
            left: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #fcc300;
        }

        &:after {
            position: absolute;
            top: 0;
            right: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #fcc300;
        }
    }

    // 实际时间gantt结束

    // 名称列
    .name-col {
        position: relative;

        &:hover .name-col-edit {
            display: inline-block;
        }

        .name-col-edit {
            display: none;
            position: absolute;
            right: 0;
        }

        .name-col-icon {
            padding: 6px 3px;
            cursor: pointer;
            font-size: 16px;
        }

        .task-remove {
            color: #f56c6c;
        }

        .task-add {
            color: #409eff;
        }
    }
}

//季度展示、月度展示、周展示
.year-and-quarter,
.year-and-month,
.year-and-week {
    .wl-item-start {
        left: 5%;
    }

    .wl-item-end {
        right: 5%;
    }

    .wl-item-full {
        left: 5%;
        right: 10%;
    }

    .wl-real-full {
        left: 10%;
        right: 5%;
    }
}
</style>
