<!--  -->
<template>
<div>
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/admin' }">后台首页</el-breadcrumb-item>
  <el-breadcrumb-item>轮播图片管理</el-breadcrumb-item>
  <el-breadcrumb-item>图片列表</el-breadcrumb-item> 
</el-breadcrumb>
<div class="newhouse">
  <el-upload
 action="/admin/uploader"
  multiple
  name="fulAvatar"
   :show-file-list="false"
   :on-success="uploadersuc"
   :before-upload="beforeAvatarUpload">
  <el-button size="small" type="primary">上传图片</el-button>
  <div slot="tip" class="el-upload__tip">  只能上传jpg或png文件，且不超过10MB!</div>
</el-upload>
  <el-table
    ref="multipleTable"
    :data="imglist"
    tooltip-effect="dark"
    style="width: 100%"
     v-loading="loading">
   <el-table-column type="index" width="200">
  </el-table-column>
     <el-table-column
      label="轮播图片">
          <template slot-scope="scope">
        <img :src="scope.row.imgLink" width="50%" /></template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        loading: true,
        imglist:[],
        multipleSelection: []
      }
    },
    mounted() {
      this.userlist()
        },
    methods: {
      beforeAvatarUpload(file) {
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;
        console.log(file.size)
        if (!isJPG) {
          this.$message.error('只支持JPG或PNG格式!');
        }
        if (!isLt10M) {
          this.$message.error('轮播图片大小不能超过10MB!');
        }
        return isJPG ;
      },
    uploadersuc(fulAvatar){
        console.log('上传成功')
          this.userlist();
        console.log(fulAvatar.imgLink)
      },
        handleEdit(index, row) {
       this.$message.warning('编辑功能暂未开放');
      },
      handleDelete(index, row) {
              axios.post('/admin/delImg',{imgSort:row.imgSort}).then((respone)=>{
                var res =respone.data;
                if(res.status=='0'){
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                }else{
                   this.$message.error('您还不能删除');
                }
              })
      },
      userlist(){
            this.loading=true;
            axios.get("/admin/imgList").then((result)=>{
              this.loading=false;
              var res =result.data;
              console.log(res.result.list);
              
              if(res.status=="0"){
                this.imglist=res.result.list
              }              
            })
          },
    }
  }
</script>
<style lang="less" scoped>
.newhouse{
    margin-top: 20px;
    margin-left: 20px
  }
  .cell {
  text-align: center;
}
.el-upload {
  float: left;
  margin-bottom: 25px;
}
.el-upload__tip {
  padding: 8px 10px 0px 100px;
}

</style>