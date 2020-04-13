
<template>
    <el-dialog
    title="请输入坐标数据"
    :visible.sync="centerDialogVisible"
    width="60%"
    :modal="false"
    center>
        <div class="flex-box">
            <div><span class="title">chart命名：</span><el-input v-model="chartName"></el-input></div>
            <div><span class="title">X轴命名：</span><el-input v-model="XName"></el-input></div>
            <div><span class="title">Y轴命名</span><el-input v-model="YName"></el-input></div>
        </div>
        <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%"
            class="table-class"
        >
            <el-table-column
                prop="X"
                label="X"
                width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.X" :disabled="scope.row.add==='+'"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="Y"
                label="Y"
                width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.Y" :disabled="scope.row.add==='+'"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="add"
                width="100"
                label="创建|移除">
                <template slot-scope="scope">
                    <div @click="handleAdd(scope.row.add,scope.$index)" :class="[scope.row.add==='+'  && 'add-icon-btn',scope.row.add==='-' && 'reduce-icon-btn']">{{ scope.row.add }}</div>
                </template>
            </el-table-column>
        </el-table>
        <highcharts v-if="chartOptions" :options="chartOptions" class="highcharts-wrapper"></highcharts>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">生 成</el-button>
            <el-button type="primary" v-if="finallyConfirm" @click="handleFinallyConfirm">最终确认</el-button>
        </span>
    </el-dialog>    
</template>


<script>
import {Chart} from 'highcharts-vue'
  export default {
      components:{
          highcharts:Chart
      },
    data() {
      return {
          finallyConfirm:false,
          chartOptions:null,
          chartName:'',
          XName:'',
          YName:'',
            tableData:[{
          add:'+'
        }],  
        centerDialogVisible: false
      };
    },
    methods:{
        handleConfirm(){
            const informaltion = []
            const newArray = this.tableData.slice()
            newArray.pop()
            newArray.forEach((item)=>{
                informaltion.push({
                    name:item.X,
                    y:+item.Y
                })
            })
            const targetOption = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: this.chartName
                },
                xAxis: {
                    type: 'category',
                    title: {
                        text: this.XName
                    }
                },
                yAxis: {
                    title: {
                        text: this.YName
                    }
                },
                tooltip:{
                    enabled:false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    colorByPoint: true,
                    data: informaltion
                }]
            }
            this.chartOptions = targetOption
            this.finallyConfirm = true

        },
        handleAdd(addOrReduce,index){
            if(addOrReduce==='+'){
                const finallyItem = this.tableData.pop()
                this.tableData.push({
                  X:0,
                  Y:0,
                  add:'-'  
                },finallyItem)
            }else if(addOrReduce==='-'){
                this.tableData.splice(index,1)
            }
        },
        async handleFinallyConfirm(){
            const html2canvas = await require('html2canvas')
            const target = document.getElementsByClassName('highcharts-wrapper')[0]
            html2canvas(target,{
                scale:1
            }).then(async (canvas)=>{
                const blob = this.getBlob(canvas);
                const oMyForm = new FormData();
                const fileName = "mobile" + '.jpg'
                oMyForm.append("img", blob, fileName);
                //				oMyForm.append("fileName", fileName);　　　　
                oMyForm.append("fileType", 'image');
                try{
                    const {data} = await this.$api.uploadBlogPhoto(oMyForm)
                    this.$parent.uploadSuccess(data) 
                    this.centerDialogVisible = false
                    this                 
                }catch(e){
                    console.log(e)
                    this.$message.error('生成chart出现问题');
                    
                }
            })
        },
        getBlob (canvas) { //获取blob对象
            let data = canvas.toDataURL("image/jpeg", 1);
            data = data.split(',')[1];
            data = window.atob(data);
            const ia = new Uint8Array(data.length);
            for (let i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }
            return new Blob([ia], {
                type: "image/jpeg"
            });
        }
    }
  };
</script>

<style lang="scss" scoped>
    .flex-box{
        .el-input{
            box-sizing: border-box;
            padding: 5px;
        }
        display: flex;
        .title{
            flex-basis: 50px;
        }
    }
    .reduce-icon-btn{
        cursor: pointer;
        text-align: center;
        &:hover{
            color:red
        }
    }
    .add-icon-btn{
        cursor: pointer;
        text-align: center;
        &:hover{
            color:rgb(49, 205, 56);
        }
    }
    /deep/{
        .table-class{
            .el-input.is-disabled .el-input__inner,.el-input .el-input__inner{
                    background-color: inherit !important;    
            }
            .el-table__body-wrapper{
                overflow: scroll;
            }
            .el-input__inner{
                border:none;
                border-radius: 0;
            }
            .cell{
                padding:0
            }
            td{
                padding: 0;
            }            
        }

    }

</style>