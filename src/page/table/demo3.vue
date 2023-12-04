<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="计划" align="center">
            <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
            <el-table-column prop="startDate" label="开始时间" width="100" align="center"> </el-table-column>
            <el-table-column prop="endDate" label="结束时间" width="100" align="center"> </el-table-column>
            <el-table-column v-for="item in 31" :label="'' + item" :key="item" width="40">
                <template v-slot:default="scope">
                    <div v-show="isCellShow(scope.row, item)" class="cell-show">
                        &nbsp;
                    </div>
                </template>
            </el-table-column>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'gante-table',
    data() {
        return {
            tableData: []
        }
    },
    computed: {
        isCellShow() {
            return function (row, i) {
                let sd = Number(row.startDate.split('-')[2])
                let ed = Number(row.endDate.split('-')[2])
                if (sd <= i && i <= ed) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    watch: {

    },
    created() {
        this.makeFakerData()
    },
    methods: {
        makeFakerData() {
            let arr = [0, 1, 2, 3, 4]
            this.tableData = []
            arr.forEach((e, i) => {
                this.tableData.push({
                    startDate: `2022-06-1${e}`,
                    endDate: `2022-06-15`
                })
            })
        }
    }
};
</script>

<style scoped>
.cell-show::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 30%;
    width: 103%;
    height: 40%;
    background-color: red;
}
</style>