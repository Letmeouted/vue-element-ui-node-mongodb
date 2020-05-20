var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test93');
// 用户
var usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        default: Date.now()
    }
});
// 分类
var categorySchema = new mongoose.Schema({
    title: String,
    time: {
        type: String,
        default: Date.now()
    }
});
// 房屋
var articleSchema = new mongoose.Schema({
    title: String,
    category: String,
    author: {
        type: String,
        default: 'admin'
    },
    content: String,
    time: {
        type: String,
        default: Date.now()
    },
    num: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    comment: {
        type: Array,
        default: []
    }
});
// 图片
var pictureSchema = new mongoose.Schema({
    imgId: String,
    imgName: String,
    imgSort: String,
    imgLink: String
})
Model = {
    User: mongoose.model('User', usersSchema),
    Category: mongoose.model('Category', categorySchema),
    Article: mongoose.model('Article', articleSchema),
    Imgs: mongoose.model('Imgs', pictureSchema)
}
module.exports = Model