<template lang="html">
  <div class="admin_category_add">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/admin' }">后台首页</el-breadcrumb-item>
  <el-breadcrumb-item>分类管理</el-breadcrumb-item>
  <el-breadcrumb-item>新添分类</el-breadcrumb-item>
</el-breadcrumb>
    <div class="form-group">
      <p>分类名</p>
      <input type="text" v-model="categoryName" placeholder='请输入分类名'>
    </div>
    <button type="button" @click='AddCategory'>添加</button>
  </div>
</template>

<script>
import navBread from '../../components/navBread'
export default {
  data(){
    return{
      categoryName: ''
    }
  },
  components:{
    navBread
  },
  methods:{
    AddCategory(){
      var that = this;
      this.$http.post('/admin/admin_category_add',{
        categoryName: this.categoryName
      }).then((response) => {
        console.log(response.data);
        if(response.data.code == 1){
          this.$message({
            message: '分类名已经存在，请重新输入新的分类名',
            type: 'error'
          });
        }
        if(response.data.code == 200){
          this.$message({
            message: '增加成功，1秒后跳转到分类列表',
            type: 'success'
          });
          setTimeout(function(){
            that.$router.push({path: '/admin_category'});
          },1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
h1{
  margin-left: 120px;
}
button{
  margin-left: 120px;
}
</style>