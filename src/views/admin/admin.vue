<template lang="html">
  <div class="admin">
    <section class="top">
      <router-link to="/admin">
        <img class="img" src="../../assets/logo1.png" alt="">
        <p class="top-left">欢迎来到ai租房中介后台</p>
      </router-link>
      <p class="top-right" @click="logout">退出</p>
      <router-link to="/"><p class="top-right">返回前台首页</p></router-link>
    </section>
    <el-container class="list">
      <div class="list-left">
        <el-aside :width="isCollapse ? '45px' : '250px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu  background-color="#324157" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#fff">
          <el-submenu index="1">
            <template slot="title"><div><i class="el-icon-user"></i>用户管理</div></template>
            <el-menu-item-group>
              <router-link to="/admin_users"><el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><div><i class="el-icon-s-operation"></i>分类管理</div></template>
            <el-menu-item-group>
              <router-link to="/admin_category"><el-menu-item index="2-1"><i class="el-icon-menu"></i>分类列表</el-menu-item></router-link>
              <router-link to="/admin_category_add"><el-menu-item index="2-2"><i class="el-icon-plus"></i>新添分类</el-menu-item></router-link>
              <router-link to="/admin_category_update"><el-menu-item index="2-3"><i class="el-icon-edit"></i>修改分类</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <div><i class="el-icon-s-home"></i>房屋管理</div>
            </template>
            <el-menu-item-group>
              <router-link to="/admin_article"><el-menu-item index="3-1"><i class="el-icon-menu"></i>房屋列表</el-menu-item></router-link>
              <router-link to="/admin_article_add"><el-menu-item index="3-2"><i class="el-icon-plus"></i>新添房屋</el-menu-item></router-link>
              <router-link to="/admin_article_update"><el-menu-item index="3-3"><i class="el-icon-edit"></i>房屋信息修改</el-menu-item></router-link>
              <router-link to="/admin_article_comment"><el-menu-item index="3-4"><i class="el-icon-menu"></i>评论列表</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <div><i class="el-icon-picture"></i>轮播图片管理</div>
            </template>
            <el-menu-item-group>
              <router-link to="/admin_picture_add"><el-menu-item index="4-1"><i class="el-icon-menu"></i>图片列表</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <div><i class="el-icon-s-order"></i>统计管理</div>
            </template>
            <el-menu-item-group>
              <router-link to="/admin_echarts"><el-menu-item index="5-1"><i class="el-icon-menu"></i>柱形图与折线图</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        </el-aside>
      </div>
      <el-main class="list-right">
        <!-- 路由占位符 -->
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
         // 是否折叠
      isCollapse: false,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
      logout(){
        this.$http.get('/users/logout').then((respond) => {
          var that = this;
          if(respond.data.code == 200 ){
            this.userCookie = !this.userCookie;
            this.$message({
              message: '退出后台管理平台，返回前台首页',
              type: 'success'
            });
            setTimeout(function(){
              that.$router.push({path: '/'});
            },1000)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .admin{
    background-color: #f1f1f1;
    .top {
      position: fixed;
      top: 0;
      left: 0;
      height: 80px;
      width: 100%;
      overflow: hidden;
      background-color: #1f2d3d;
      .img{
        float: left;
        height: 60px;
        width: 60px;
        margin: 10px 30px;
      }
      .top-left{
        float: left;
        margin-right: 20px;
        line-height: 80px;
        color: #fff;
      }
      .top-right{
        float: right;
        margin-right: 20px;
        line-height: 80px;
        color: #fff;
        cursor: pointer;
      }
    }
    .list{
      margin-top: 80px;
      display: flex;
      height: 100%;
      .list-left{
        position: fixed;
        top: 80px;
        left: 0;
        flex: 0 0 250px;
        width: 250px;
        height: 100%;
        background-color: #fff;
      }
      .list-right{
        flex: 1;
        margin-left: 250px;
        padding: 20px;
        background-color: #fff;
      }
    }
  }
  .el-aside {
  background-color: #324157;
  height: 100%;
  .el-menu {
    border-right: none;
  }
}

.toggle-button {
  background-color: #324157;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
