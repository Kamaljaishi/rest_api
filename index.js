const express= require('express');
const bodyParser = require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger);
const PORT=3001;
let bloglist=[];
function logger(req,res,next){
    console.log(req.url);
    console.log(req.body);
    next();
}
function isAuthenticate(req,res,next){
    console.log("Yes it is authenticated");
    next();
}

app.get('/blogs',isAuthenticate,(req,res)=>{
    return res.status(404).json({
        data:bloglist,
        success:true,

    });
});

app.post('/blogs',(req,res)=>{
    
    bloglist.push({title:req.body.title,
                content:req.body.content,
                id:Math.floor(Math.random()*1000)})
                
    return res.status(202).json({
        success:true
    })
})

    app.get('/blogs/:id',(req,res)=>{
        const val=bloglist.filter((blog)=>blog.id==req.params.id);
        return res.status(203).json({
            data:val,
            success:true
        });
    })
    app.delete('/blogs/:id',(req,res)=>{
        bloglist=bloglist.filter((blog)=>blog.id!=req.params.id)
        return res.status(102).json({
            success:true,
            data:bloglist

        })
    })

app.listen(PORT,()=>{
    console.log("port started at",PORT);
})
