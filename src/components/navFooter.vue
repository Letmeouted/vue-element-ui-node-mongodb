<template>
  <div class="navFooter">
    <el-menu  class="el-menu-demo" mode="horizontal" background-color="#24292e" text-color="#fff">
  <el-menu-item index="1"><el-link @click="btn"   style="color:#fff" target="_blank">关于我们</el-link></el-menu-item>
  <el-menu-item index="2"><el-link  style="color:#fff" target="_blank" href="tencent://message/?uin=1002726239&Site=sc.chinaz.com&Menu=yes">联系我们</el-link></el-menu-item>
  <el-menu-item index="3"><el-link  style="color:#fff" target="_blank" @click="contract">合同声明</el-link></el-menu-item>
  <el-menu-item index="4"><el-link href="https://www.ele.me"  style="color:#fff" target="_blank">友情链接</el-link></el-menu-item>
</el-menu>
    <div class="container">
      <p>Copyright © 2019 个人网站 All Rights Reserved 苏ICP备17826170039</p>
    </div>
  </div>
</template>

<script>
export default {
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
methods: {
  btn(){
    this.$router.push({name:'About'})
  },
  contract(){
    this.$router.push({name:'Contract'})
  },
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>

<style lang="less" scoped>
.el-tabs{
    background-color: #24292e
  }
  .navFooter{
    height: 200px;
    line-height: 80px;
    background-color: #24292e;
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
  
</style>
