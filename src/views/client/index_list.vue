<template lang="html">
  <div class="index_list">
    <!-- 分类列表 -->
      <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item,index) in listImg" :key="index">
      <h3 class="medium">{{ item.imgsort }}</h3>
      <img :src="item.imgLink">
    </el-carousel-item>
  </el-carousel>
    <section class="category-item">
      <ul>
        <li @click="activeChecked = 'all'"  :class="{'actived': activeChecked == 'all'}" >
          <p  @click="selectAllData">首页</p></li>
        <li @click="activeChecked = index" :class="{'actived':activeChecked == index }"  v-for="(item,index) in categoryData">
            <span @click="selectData(index,item)">{{item.title}}</span>
        </li>
      </ul>
    </section>
   
    <div class="way">
     <el-input placeholder="请输入小区/商圈/地铁站等..." v-model="search" class="input-with-select" >
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:125px">
      <el-option label="上海" value="1"></el-option>
      <el-option label="北京" value="2"></el-option>
      <el-option label="深圳" value="3"></el-option>
      <el-option label="南京" value="4"></el-option>
      <el-option label="成都" value="5"></el-option>
      <el-option label="武汉" value="6"></el-option>
      <el-option label="广州" value="7"></el-option>
    </el-select>
    <el-button slot="append" class="search" @click="btn">开始找房</el-button>
  </el-input>
   </div>
  <div class="way">
      房源区域：
       <el-radio-group v-model="radio1">
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="智慧园"></el-radio-button>
      <el-radio-button label="立民村"></el-radio-button>
      <el-radio-button label="塘口村"></el-radio-button>
      <el-radio-button label="勤劳村"></el-radio-button>
      <el-radio-button label="芦胜村"></el-radio-button>
      <el-radio-button label="知新村"></el-radio-button>
    </el-radio-group>
  </div>
  <div class="way">
      租金：
       <el-radio-group v-model="radio2">
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="500-1000"></el-radio-button>
      <el-radio-button label="1001-2000"></el-radio-button>
      <el-radio-button label="2001-3000"></el-radio-button>
      <el-radio-button label="3001-4000"></el-radio-button>
    </el-radio-group>
  </div>
  <div class="way">
      出租方式：
       <el-radio-group v-model="radio3">
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="短租"></el-radio-button>
      <el-radio-button label="长租"></el-radio-button>
      <el-radio-button label="合租"></el-radio-button>
      <el-radio-button label="个人"></el-radio-button>
    </el-radio-group>
  </div>
  <div class="way">
      面积：
       <el-radio-group v-model="radio4">
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="10平方"></el-radio-button>
      <el-radio-button label="20-40平方"></el-radio-button>
      <el-radio-button label="41-60平方"></el-radio-button>
      <el-radio-button label="61-80平方"></el-radio-button>
      <el-radio-button label="100平方以上"></el-radio-button>
    </el-radio-group>
  </div>
  <div class="way">
      房型：
       <el-radio-group v-model="radio5">
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="一室一厅"></el-radio-button>
      <el-radio-button label="两室一厅"></el-radio-button>
      <el-radio-button label="三室一厅"></el-radio-button>
      <el-radio-button label="一室一厅一卫"></el-radio-button>
    </el-radio-group>
  </div>
 
    <!-- 房屋简介 -->
    <div class="left-item" v-for="item in articleData">
      <router-link :to="{path: '/detail', query: {_id: item._id }}">
        <h1>{{ item.title }}</h1>
        <p class="info">
          <span><i class="el-icon-menu"></i><i>分类:</i> {{ item.category }}</span>
          <span><i class="el-icon-information"></i><i>发布者:</i> {{ item.author }}</span>
          <span><i class="el-icon-search"></i><i>浏览:</i> {{ item.views }}</span>
          <span><i class="el-icon-star-on"></i><i>点赞:</i> {{ item.like }}</span>
          <span><i class="el-icon-message"></i><i>评论:</i> {{ item.comment.length }}</span>
          <span><i class="el-icon-time"></i><i>时间:</i> {{ item.time }}</span>
        </p>
        <div class="money" style="text-align:right;color: #f03435;">
            <strong>
              价格:
          ¥{{item.num}}元/月</strong>
          </div>
        <p class="desc" v-html="item.content"></p>
        <button type="button">更多详情</button>
      </router-link>
    </div>
    <!-- 分页 -->
    <section class="page">
      <button type="button" @click="prev">上一页</button>

      <span>当前第 <i>{{ page }}</i> 页</span>/
      <span>总共 <i>{{ pages }}</i> 页</span>/
      <span>每页 <i>{{ limit }}</i> 条数据</span>/
      <span>总共 <i>{{ count }}</i> 条数据</span>

      <button type="button" @click="next">下一页</button>
    </section>
    
  </div>
</template>

<script>

import axios from 'axios'
import Swiper from 'swiper';

export default {
  data(){
    return{
      radio1:'不限',
      radio2:'不限',
      radio3:'不限',
      radio4:'不限',
      radio5:'不限',
      input1:'',
      input2:'',
      search:'',
      searchData:'',
      select:'',
      categoryData:'',
      articleData:'',
      count: '',
      page: '',
      pages: '',
      limit: '',
      // activeChecked: '0'
      activeChecked: 'all',
      listImg: [],
      
    }
  },
  mounted () {
    this.item
  },
  methods:{
    btn:function (param) { 
      var search=this.search;
      if(search){
        this.articleData=this.articleData.filter(value=>value.title.indexOf(this.search)!==-1)
      }
      
     },
    // 选择所有分类
    selectAllData(){
      this.$http.get('/index/index_article').then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
        this.count = response.data.count;
        this.page = response.data.page;
        this.pages = response.data.pages;
        this.limit = response.data.limit;
      });
    },
    // 选择单个分类
    selectData(index,item){
      var category = item.title;
      this.$http.get('/index/index_article_category?category=' + category ).then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
        this.count = response.data.count;
        this.page = response.data.page;
        this.pages = response.data.pages;
        this.limit = response.data.limit;
      })
    },
    next(obj){
      this.page++;
      if(this.page > this.pages){
        this.page = this.pages;
        this.$message({
          message: '已经是最后一页',
          type: 'warning'
        });
        return;
      }
      this.$http.get('/index/index_article?page=' + this.page).then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
      })
    },
    prev(){
      this.page--;
      if(this.page < 1){
        this.page = 1;
        this.$message({
          message: '已经是第一页',
          type: 'warning'
        });
        return;
      }
      this.$http.get('/index/index_article?page=' + '?page=' + this.page).then((response) => {
        this.articleData = response.data.data;
      })
    }
  },
  created(){
    this.$http.get('/index/index_article').then((response) => {
      console.log(response.data);
      this.articleData = response.data.data;
      this.count = response.data.count;
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.limit = response.data.limit;
    });
    this.$http.get('/index/index_article_category').then((response) => {
      console.log(response.data);
    })
    this.$http.get('/index/index_category').then((response) => {
      console.log(response.data);
      this.categoryData = response.data.data;
    })
    this.$http.get('/index/imgList').then((response)=>{
      console.log(response.data);
      this.listImg=response.data.result.list
    })
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item {
  h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  &:nth-child(2n) {
    background-color: #99a9bf;
  }
  &:nth-child(2n+1) {
      background-color: #d3dce6;
    }
}
.category-item{
  height: 50px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
  ul{
    li{
      float: left;
      padding: 0 20px;
      height: 50px;
      font-weight: bold;
      line-height: 50px;
      cursor: pointer;
      &:hover{
        color: #4fc08d;
        border-bottom: 2px solid #4fc08d;
      }
      &.actived{
        color: #4fc08d;
        border-bottom: 2px solid #4fc08d;
      }
      span{
        display: inline-block;
      }
    }
  }
}

.input-with-select {
  .el-input-group__prepend {
    background-color: #fff;
  }
}
.way {
  margin-bottom: 15px;
}
.search{
  background-color: #ff961e !important;
  color: #fff !important;
}

.left-item{
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
  transition: 0.5s;
  &:hover{
    transform: translateY(-6px);
    box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
  }
  h1{
    margin: 20px 0;
    font-size: 22px;
  }
  .info{
    margin: 20px 0;
    font-size: 14px;
    span{
      margin-right: 15px;
      color: #999;
      i{
        font-style: normal;
        color: #4fc08d;
        margin-right: 5px;
      }
    }
    .money {
        float:right;
        margin: 50px 0 0 0;
        text-align: right;
         
        font-weight: bold;
        line-height: 40px;
        height: 40px;
        width: 140px;
      }
  }
  .desc{
    width: 800px;
    height: 40px;
    line-height: 40px;
    overflow:hidden;//将超出的部分隐藏
    // text-overflow:ellipsis;//超出部分用省略号显示
    // white-space:nowrap;//溢出不换行
  }
  button{
    width: 100px;
    height: 35px;
    margin-top: 20px;
    line-height: 35px;
    text-align: center;
    background-color: #fff;
    color: #4fc08d;
    border: 1px solid #4fc08d;
    border-radius: 5px;
    outline: none;
    &:hover{
      background-color: #4fc08d;
      color: #fff;
      border: 1px solid #4fc08d;
    }
  }
}

</style>
