const Blog = require('../models/blogs');

const blog_Index = (req,res) => {
    Blog.find().sort({createdAt: -1})
    .then(blogs => {
        res.render('index',{title:"All Blogs",blogs});
    })
    .catch((err)=>{
        console.log(err)
    });

}

const blog_CreateIndex = (req, res) => {
    res.render('create',{title:"Create"});
}

const blog_GetById = (req,res) => {
    aBlog = Blog.findById(req.params.id);

    aBlog.then(blog => {
        res.render('details',{title:aBlog.title,blog:blog});
    })
    .catch((err)=>{
        console.log(err);
    });

}

const blog_delete = (req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs', message:"Blog Deleted"});
    })
    .catch((err)=>{
        console.log(err);
    });
}

const blog_Post = (req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports = {
    blog_Index,
    blog_CreateIndex,
    blog_GetById,
    blog_Post,
    blog_delete,
}