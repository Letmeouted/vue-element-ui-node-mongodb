# 全栈第一步

> vue(全家桶)+node(express)+mongodb(mongoose)+阿里云(cenOS)部署+域名上线，前后端分离博客


# 项目介绍
## 技术栈
vue2 + vue-router + webpack + ES6 + axios + less + flex + cookie + exprss + mongoDB 
#### 已完成
1. 前台部分
- [x] 登录
- [x] 注册
- [x] 退出
- [x] 登录后，点赞
- [x] 登录后，取消点赞
- [x] 登录后，评论
- [x] 房屋按分类查看
- [x] 房屋分页
2. 后台部分
- [x] 登录权限，管理员才能登录
- [x] 用户管理
- [x] 分类管理
- [x] 房屋管理
- [x] 评论管理
- [x] 图表管理
- [x] 轮播图管理



# 开发阶段
## 分开2个终端运行
#### Vue
``` bash
# 安装依赖
cd vue-node-mongodb
cnpm install

# 打开浏览器运行 localhost:8080
npm run dev

# 打包
npm run build

```
打包后生成**dist**文件夹
#### Node
``` bash
# 安装依赖
cd vue-node-mongodb/server
cnpm install

# 打开浏览器运行 localhost:80
npm start
```
此时，只要打开2个终端运行，就可以正常访问了

## 打包后，只需要运行一个终端
把打包后生成的**dist**文件夹,复制到
```
vue-node-mongodb/server
```
cd vue-node-mongodb/server/app.js 

找到 `app.use(express.static(path.join(__dirname, 'public')))` 在后面加上，以下代码

```
app.use(express.static(path.join(__dirname,'dist')));
```
```
# 打开浏览器运行 localhost:80
npm start
```
## 提醒
数据库名字更改
``` bash
# cd vue-node-mongodb/server/data/module.js

找到 mongoose.connect('mongodb://localhost:27017/test93');
把 test93 修改成你自己喜欢的数据库名字
`
