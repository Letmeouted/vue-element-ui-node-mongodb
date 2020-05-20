<template lang="html">
  <div class="admin_article_add">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/admin' }">后台首页</el-breadcrumb-item>
  <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
  <el-breadcrumb-item>新添房屋</el-breadcrumb-item>
</el-breadcrumb>
    <div class="form-group">
      <p>房屋名称</p>
      <el-input  v-model="articleName" placeholder='请输入房屋名称'></el-input>
    </div>
    <div class="form-group">
      <p>房屋分类</p>
        <el-select v-model="articleCategory" placeholder="请选择" clearable>
          <el-option v-for="item in categoryData" :value="item.title">{{ item.title }}</el-option>
        </el-select>
    </div>
    <div class="price">
      <p >房屋价格</p>
      <el-input-number v-model="num" @change="handleChange" :min="500"  :step="100" controls-position="right" class="housePrice"></el-input-number>
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
      <button type="button" @click='addArticle'>添加</button>
    </div>
  </div>
</template>

<script>
import navBread from '../../components/navBread'

export default {
  data(){
    return{
      num:1000,
      articleName: '',
      articleCategory: '',
      articleContent: '',
      categoryData:'',
       editorOption: {               //符文本编辑器的配置
    placeholder: '请输入房屋详情...',
    theme: 'snow',
   
      },
    }
  },
  components:{
    navBread
  },
  methods:{
     handleChange(value) {
        console.log(value);
      },
    addArticle(){
      var that = this;
      this.$http.post('/admin/admin_article_add',{
        num:this.num,
        articleName: this.articleName,
        articleCategory: this.articleCategory,
        articleContent: this.articleContent
      }).then((response) => {
        console.log(response.data);
        this.$message({
          message: '增加成功，1秒后跳转',
          type: 'success'
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
    },
  },
  created(){
    this.$http.get('/index/index_category').then((response) => {
      console.log(response.data);
      this.categoryData = response.data.data;
      console.log(this.categoryData);
    })
  }
}
</script>

<style lang="less" scoped>
.el-upload--picture-card {
    margin: 24px 0 0 23px ! important;
  }
h1 {
  margin-left: 120px;
}
button {
  margin-top: 70px;
}
.edit {
  margin: 0 40px;
}
.articleContent {
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
