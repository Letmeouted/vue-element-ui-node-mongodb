<template lang="html">
  <div class="navHeader">
    <div class="container">
      <div class="left">
        <router-link to="/"><img src="../assets/logo.png" width="60" height="60" alt=""></router-link>
      </div>
      <div class="right">
        欢迎来到ai租房中介网
      </div>
      <div class="map">
        <el-button icon="el-icon-location-information" type="primary" @click="btnClick">地图找房</el-button>
      </div>
      <div class="github">
        <a href="https://github.com/wang-boss/git-demo" target="_blank">
          <img src="../assets/github-logo.png" alt="github">
        </a>
      </div>
      <div class="weixin">
        <a href="tencent://message/?Menu=yes&uin=898561737& Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45" target="_blank">
        <img src="../assets/qq-logo.jpg" alt="QQ">
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data (){
    return {

    }
  },
    methods:{ //跳转页面
     btnClick(){
       this.$router.push({name:'Map'  })
       }
       }
}
</script>

<style lang="less" scoped>
.navHeader{
  height: 80px;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0,0,0,0.07);
  .left{
    float: left;
    img{
      margin: 10px;
    }
  }
  .right{
    float: left;
    line-height: 80px;
    margin: 0 20px;
    font-weight: bold;
  }
  .github{
    float: right;
    img{
      width: 60px;
      height: 60px;
      display: block;
      margin: 10px;
    }
  }
  .weixin{
    float: right;
    img{
      width: 60px;
      height: 60px;
      display: block;
      margin: 10px;
    }
  }
  .map{
    float: right;
    margin-top: 30px
  }
  
}
</style>
