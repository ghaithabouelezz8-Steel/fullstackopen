const blogRouter=require('express').Router()
const Blog=require('../models/blog')

const User=require('../models/user')
const middleware= require('../utils/middleware')
const userExtractor=require('../utils/middleware').userExtractor

blogRouter.get('/',async(request,response)=>{
     const blogs= await Blog.find({}).populate('user',({_id:1,username:1,name:1}))
    response.json(blogs)
})
blogRouter.get('/:id',async(request,response)=>{
const blogToBeFound=await Blog.findById(request.params.id)
await blogToBeFound.populate('user',({_id:1,username:1,name:1}))
    if(!blogToBeFound){
        response.status(404).end()
    }
    else{
        response.json(blogToBeFound)
        
    }



})

blogRouter.post('/',userExtractor,async(request,response)=>{
    const body=request.body



    const user=request.user

    if(!user)
        return response.status(400).json({error:'userId missing or not valid'})

const newBlog=new Blog({title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user:user._id})

        if(!newBlog.url || !newBlog.title)
        return  response.status(400).json({error:'title or url missing'})
const blog =await newBlog.save()

user.blogs=user.blogs.concat(blog._id)
await user.save()
await blog.populate('user', {_id:1,
  username: 1,
  name: 1
})
    response.status(201).json(blog)

})

blogRouter.delete('/:id',userExtractor,async(request,response)=>{

    const user= request.user

    if(!user)
        return response.status(401).json({error:'user missing or invalid token'})

const blog =await Blog.findById(request.params.id)

if(!blog)
    return response.status(404).json({error:'blog not found'})
if(blog.user.toString()!==user._id.toString()){
    return response.status(401).json({error:'only the creator of the blog is allowed to delete it'})
}
   await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    
})

blogRouter.put('/:id',async(request,response)=>{
const body =request.body

 const blog=await Blog.findById(request.params.id)
    
        blog.author=body.author
        blog.url=body.url
        blog.likes=body.likes || 0
        blog.title=body.title

       await blog.save()
       await blog.populate('user', {_id:1,
  username: 1,
  name: 1
})
       response.status(200).json(blog)
    
    
})

module.exports=blogRouter