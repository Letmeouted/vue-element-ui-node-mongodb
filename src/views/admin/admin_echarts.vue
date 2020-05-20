<!--  -->
<template>
<div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/admin' }">后台首页</el-breadcrumb-item>
  <el-breadcrumb-item>统计管理</el-breadcrumb-item>
  <el-breadcrumb-item>折线图与柱形图</el-breadcrumb-item> 
</el-breadcrumb>
 <div class="MyAchievement">
            <div class="MyAchievement-echart">
                   <div class="echart-title">房屋浏览量与喜爱量</div>
                   <div class="echart-content">
                        <div id="myChart" :style="{width: '1500px', height: '460px'}"></div>
                   </div>
            </div>
       </div>
</div>
</template>
       
<script>
import {option} from '../admin/echarts'
    export default {
    data() {        
        return {
        }
    },
    mounted(){        
        this.drawLine();
    },
    methods: {
        drawLine(){            
            var myChart = this.$echarts.init(document.getElementById('myChart'));//获取容器元素
            
            //防止越界，重绘canvas            
            window.onresize = myChart.resize;
            myChart.setOption(option);//设置option 
            //显示加载动画
            myChart.showLoading();
                //获取数据
            this.$http.get('/admin/admin_article').then(res => {
                    //将json对象的所有title数据组成一个数组
                    console.log(res.data.data)
                    var title = [];
                    for(let i = 0;i < res.data.data.length;i++){
                        title.push(res.data.data[i].title);
                    }
                    //将json对象中的所有views数据组成一个数组
                    var views = [];
                    for(let i = 0;i < res.data.data.length;i++){
                        views.push(res.data.data[i].views);
                    }
                     var like = [];
                    for(let i = 0;i < res.data.data.length;i++){
                        like.push(res.data.data[i].like);
                    }
                    setTimeout(()=>{  //为了让加载动画效果明显,这里加入了setTimeout,实现300ms延时
                        myChart.hideLoading(); //隐藏加载动画
                        myChart.setOption({
                            xAxis: {
                                data: title
                            },
                            series: [{
                                 data: views
                            },
                            {
                                data:like
                            }]
                        })
                    }, 300 )
                })     
            }
    }
}
</script>
<style lang="less" scoped>
      .MyAchievement {
  display: flex;
  flex-direction: column;
  padding: 0px 90px;
  .MyAchievement-echart {
    width: 100%;
    height: 570px;
    border-radius: 10px;
    border: 1px solid #d3d9e9;
    box-shadow: 4px 6px 10px -2px #d3d9e9;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
}
.MyAchievement-echart {
  .echart-title {
    width: 100%;
    height: 70px;
    background-color: #00abf7;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 26px;
    color: #fff;
    text-align: center;
    line-height: 75px;
  }
  .echart-content {
    width: 100%;
    height: 500px;
    display: flex;
    // align-items: center;
    justify-content: center;
  }
}
.echart-content {
  #myChart {
    margin-top: 35px;
  }
}

</style>