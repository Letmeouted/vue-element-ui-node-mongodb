var express = require('express');
var router = express.Router();
var Model = require('../data/module');

var uuidv4 = require('uuid/v4');
//上传图片
var formidable = require('formidable');
fs = require('fs'),
    TITLE = '上传测试',
    AVATAR_UPLOAD_FOLDER = '/static/images/',
    domain = "http://localhost:8080";
// 所有请求都要经过这一步，统一请求返回的数据格式
var responseData;
router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
});
// 定义时间格式
var date = new Date(),
    yy = date.getFullYear(),
    MM = date.getMonth() + 1,
    dd = date.getDate(),
    hh = date.getHours(),
    mm = date.getMinutes(),
    ss = date.getSeconds();
var time = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('localhost:3000/admin首页');
});

router.use(function(req, res, next) {
    console.log(req.userInfo);
    if (!req.cookies.userInfo) {
        responseData.code = 1;
        responseData.message = '没有登录';
        res.json(responseData);
        return;
    }
    next();
})

// 查找所有用户
router.get('/admin_users', function(req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 4;
    var pages = 0;
    Model.User.count().then(function(count) {
        pages = Math.ceil(count / limit); //总数据除以每页限制数据=页数
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;

        Model.User.find({}).limit(limit).skip(skip).then(function(doc) {
            // console.log(doc);
            responseData.code = 200;
            responseData.message = '查找所有用户成功';
            responseData.data = doc;
            responseData.count = count;
            responseData.limit = limit;
            responseData.page = page;
            responseData.pages = pages;
            responseData.skip = skip;
            console.log(responseData);
            res.json(responseData);
        })
    })
})

// 删除用户
router.post('/admin_users_del', function(req, res, next) {
        var _id = req.body._id;
        Model.User.remove({ _id: _id }, function(err, doc) {
            if (err) {
                conosle.log(err);
                return;
            } else {
                responseData.code = '200';
                responseData.message = '删除成功';
                res.json(responseData);
                return;
            }
        })
    })
    // 查找所有分类
router.get('/admin_category', function(req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 4;
    var pages = 0;
    Model.Category.count().then(function(count) {
        pages = Math.ceil(count / limit); //总数据除以每页限制数据=页数
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;

        Model.Category.find({}).sort({ _id: -1 }).limit(limit).skip(skip).then(function(doc) {
            // console.log(doc);
            responseData.code = 200;
            responseData.message = '查找所有分类成功';
            responseData.data = doc;
            responseData.count = count;
            responseData.limit = limit;
            responseData.page = page;
            responseData.pages = pages;
            responseData.skip = skip;
            console.log(responseData);
            res.json(responseData);
        })
    })
})


// 分类增加
router.post('/admin_category_add', function(req, res, next) {
    var categoryName = req.body.categoryName;
    console.log('新的分类名为:' + categoryName);
    newCategory = {
        title: categoryName,
        time: yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
    };
    Model.Category.findOne({ title: categoryName }, function(doc) {
        if (doc) {
            responseData.code = 1;
            responseData.message = '分类名已经存在';
            res.json(responseData);
            return;
        } else {
            Model.Category.create(newCategory, function(doc) {
                responseData.code = 200;
                responseData.message = '增加新的分类成功';
                responseData.data = doc;
                res.json(responseData);
            })
        }
    })
})

// 分类删除
router.post('/admin_category_del', function(req, res, next) {
    var _id = req.body._id;
    Model.Category.remove({ _id: _id }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send(doc);
        }
    })
});

// 点击修改跳转到分类修改页面
router.get('/admin_category_update', function(req, res, next) {
    var _id = req.query._id;
    Model.Category.findOne({ _id: _id }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            responseData.code = 200;
            responseData.message = '查询分类修改id成功';
            responseData.data = doc;
            res.json(responseData);
        }
    })
});

// 分类修改
router.post('/admin_category_update', function(req, res, next) {
    var _id = req.body._id;
    var title = req.body.title;
    Model.Category.update({ _id: _id }, { $set: { title: title } }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            responseData.code = 200;
            responseData.message = '修改成功';
            responseData.data = doc;
            res.json(responseData);
        }
    })
});


// 查找所有房屋
router.get('/admin_article', function(req, res, next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;
    Model.Article.count().then(function(count) {
        pages = Math.ceil(count / limit); //总数据除以每页限制数据=页数
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;

        Model.Article.find({}).sort({ _id: -1 }).limit(limit).skip(skip).then(function(doc) {
            // console.log(doc);
            responseData.code = 200;
            responseData.message = '查找所有房屋成功';
            responseData.data = doc;
            responseData.count = count;
            responseData.limit = limit;
            responseData.page = page;
            responseData.pages = pages;
            responseData.skip = skip;
            console.log(responseData);
            res.json(responseData);
        })
    })
})

// 房屋添加页
router.get('/admin_category_add', function(req, res, next) {
    Model.Category.find({}, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            responseData.code = 200;
            responseData.message = '查询房屋分类成功';
            responseData.data = doc;
            res.json(responseData);
        }
    })
});
// 房屋添加操作页面
router.post('/admin_article_add', function(req, res, next) {
        var title = req.body.articleName;
        var category = req.body.articleCategory;
        var content = req.body.articleContent;
        var num = req.body.num;
        var time = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
        var newArticle = {
            title: title,
            category: category,
            content: content,
            num: num,
            time: time
        }
        Model.Article.create(newArticle, function(err, doc) {
            if (err) {
                console.log(err);
                return;
            } else {
                responseData.code = 200;
                responseData.message = '查询房屋分类成功';
                responseData.data = doc;
                res.json(responseData);
            }
        })
    })
    // 房屋删除
router.post('/admin_article_del', function(req, res, next) {
    var _id = req.body._id;
    Model.Article.remove({ _id: _id }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send(doc);
        }
    })
});
// 跳转到房屋修改页面
router.get('/admin_article_update', function(req, res, next) {
    var _id = req.query._id;
    Model.Article.findOne({ _id: _id }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            responseData.code = 200;
            responseData.message = '查询要修改房屋成功';
            responseData.data = doc;
            res.json(responseData);
        }
    })
})

// 房屋修改
router.post('/admin_article_update', function(req, res, next) {
    var articleTitle = req.body.articleTitle;
    var articleCategory = req.body.articleCategory;
    console.log('新的房屋分类为' + articleCategory);
    var articleContent = req.body.articleContent;
    var num = req.body.num;
    var articleId = req.body.articleId;
    var newArticle = {
        title: articleTitle,
        category: articleCategory,
        num: num,
        content: articleContent
    }
    Model.Article.update({ _id: articleId }, { $set: newArticle }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            // console.log(doc);
            res.send(doc);
        }
    })
})

// 跳转到房屋评论管理页面
router.get('/admin_article_comment', function(req, res, next) {
    var _id = req.query._id;
    Model.Article.findOne({ _id: _id }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        } else {
            responseData.code = 200;
            responseData.message = '查询当前房屋,所有的评论成功';
            responseData.data = doc;
            res.json(responseData);
        }
    })
})

// 删除当前房屋的一个评论
router.post('/admin_article_comment', function(req, res, next) {
        var _id = req.body._id;
        var user = req.body.user;
        var comments = req.body.comments;
        var time = req.body.time;
        var delData = {
            user: user,
            comments: comments,
            time: time
        }
        console.log("传过来的数据:" + _id, user, comments, time);
        Model.Article.findOne({ _id: _id }, function(err, doc) {
            if (err) {
                console.log(err);
                return;
            } else {
                doc.comment.remove(delData);
                doc.save();
                responseData.code = 200;
                responseData.message = '删除当前房屋,一条评论成功';
                responseData.data = doc;
                res.json(responseData);
            }
        })
    })
    //上传图片接口
router.post('/uploader', function(req, res) {
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = '../' + AVATAR_UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 10 * 1024 * 1024; //文件大小
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }
        var extName = ''; //后缀名
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index', { title: TITLE });
            return;
        }
        var pathName = Math.random() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + pathName;
        //显示地址；
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + pathName;
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
        //获取条数
        Model.Imgs.find({}).count(function(err, count) {
            //创建数据
            Model.Imgs.create({
                imgId: uuidv4(),
                imgLink: showUrl,
                imgPathName: pathName,
                imgSort: count + 1
            }, function(err, doc) {
                if (err) {
                    res.json({
                        status: '1',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        imgLink: showUrl
                    })
                }
            })
        });
    });
});
//图片列表（轮播图）
router.get('/imgList', function(req, res) {
        Model.Imgs.find({}).sort({ 'imgSort': 1 }).exec(function(err, doc) {
            if (err) {
                res.json({
                    status: "1",
                    mag: err.message
                });
            } else {
                res.json({
                    status: "0",
                    msg: '',
                    result: {
                        count: doc.length,
                        list: doc
                    }
                })
            }
        })
    })
    //轮播图删除接口
router.post("/delImg", function(req, res, next) {
    var adminId = req.cookies.adminId,
        imgSort = req.body.imgSort;
    console.log(imgId);
    if (adminId = undefined) {
        if (imgId == "10001" || imgId == "10002" || imgId == "10003") {} else {
            Model.Imgs.findOne({ imgSort: imgSort }, function(err, doc) {
                var PathName = AVATAR_UPLOAD_FOLDER + doc.imgPathName
                    //删除目录文件
                fs.unlink(PathName, function(err, doc) {
                    if (err) {
                        res.json({
                            status: "2",
                            msg: '删除路径错误',
                            result: ''
                        })
                    } else {
                        Model.Imgs.remove({
                            'imgSort': imgSort
                        }, function(err, doc) {
                            if (err) {
                                res.json({
                                    status: "1",
                                    msg: err.message,
                                    result: ''
                                })
                            } else {
                                res.json({
                                    status: "0",
                                    msg: '删除成功',
                                    result: ''
                                })
                            }
                        })
                    }
                });
            })
        }
    } else {
        res.json({
            status: "10001",
            msg: '',
            result: '非法操作'
        })
    }
})
module.exports = router;