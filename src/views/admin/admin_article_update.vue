<template lang="html">
  <div class="admin_article_update">
     <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/admin' }">后台首页</el-breadcrumb-item>
  <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
  <el-breadcrumb-item>房屋信息修改</el-breadcrumb-item>
</el-breadcrumb>
    <div class="form-group">
      <p>房屋名称</p>
      <el-input  v-model="articleTitle" placeholder='请输入房屋名称'></el-input>
    </div>
    <div class="form-group">
      <p>房屋分类</p>
        <el-select v-model="articleCategory" placeholder="请选择" clearable>
          <el-option v-for="item in categoryData" :value="item.title">{{ item.title }}</el-option>
        </el-select>
    </div>
    <div class="price">
      <p>房屋价格</p>
      <el-input-number v-model="num" @change="handleChange" :min="500"  :step="100" controls-position="right" class="housePrice">元</el-input-number>
    </div>
    <div class="form-group">
      <p>房屋详情</p>
      <!-- <textarea v-model="articleContent"></textarea> -->
    </div>
    <div class="edit">
      <quill-editor class="articleContent" v-model="articleContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
      <button type="button" @click='updateArticle(articleId)'>修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      num:1000,
      articleData:'',
      articleTitle: '',
      articleCategory: '',
      articleContent: '',
      articleId: '',
      categoryData: '',
      editorOption: {},
    }
  },
  methods:{
    updateArticle(obj){
      console.log(this.articleCategory);
      var that = this;
      this.$http.post('/admin/admin_article_update',{
        num:this.num,
        articleTitle: this.articleTitle,
        articleCategory: this.articleCategory,
        articleContent: this.articleContent,
        articleId: obj
      }).then((response) => {
        console.log(response.data);
        this.$message({
          message: '修改成功，1秒后跳转',
          type: 'info'
        });
        setTimeout(function(){
          that.$router.push({path: '/admin_article'});
        },1000)
      })
    },
    handleChange(value){
      console.log(value);
    },
    onEditorBlur(editor) {
    },
    onEditorFocus(editor) {
    },
    onEditorReady(editor) {
    },
    onEditorChange({ editor, html, text }) {
      this.content = html
    }
  },
  created(){
    this.$http.get('/admin/admin_article_update?_id=' + this.$route.query._id).then((response) => {
      console.log(response.data);
      this.article = response.data.data;
      this.articleTitle = response.data.data.title;
      this.articleCategory = response.data.data.category;
      this.articleContent = response.data.data.content;
      this.num=response.data.data.num
      this.articleId = response.data.data._id;
    })
    this.$http.get('/index/index_category').then((response) => {
      console.log(response.data);
      this.categoryData = response.data.data;
    })
  }
}
</script>

<style lang="less" scoped>
h1{
  margin: 20px 0;
  margin-left: 120px;
}
button{
  // margin-left: 120px;
  margin-top: 70px;
}
.edit{
  margin: 0 40px;
}
.articleContent{
  height: 250px;
}
.price {
  margin-left: 35px;
  p {
    float: left;
    font-size: 16px;
    font-weight: 700;
  }
  .housePrice {
    margin-left: 24px;

  }
}
</style>
