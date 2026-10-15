const _=require('lodash')

const dummy = (blogs) => {
 return 1
}



const totalLikes=(blogs)=>{
    
    const sum=(value,i=0)=>{
        if(i>=value.length)
            return 0
        return value[i] +sum(value,i+1)
    }
    let likes=blogs.map(blog=>blog.likes)
    return sum(likes)
    
    
}

const favoriteBlog=(blogs)=>{
let likes=blogs.map(blog=>blog.likes)
const mostLikes = Math.max(...likes)
const mostLiked=blogs.find(blog=>blog.likes===mostLikes)
return mostLiked

}

const mostBlogs=(blogs)=>{
const groupedByAuthor=_.groupBy(blogs,'author')
const authorBlogCounts=_.map(groupedByAuthor,(authorBlogs,author)=>({
    author:author,
    blogs:authorBlogs.length,
}))
return _.maxBy(authorBlogCounts,'blogs')
}

const mostLikes=(blogs)=>{
    const groupedByAuthor=_.groupBy(blogs,'author')
    const AuthorBlogLikes=_.map(groupedByAuthor,(authorBlogs,author)=>({
        author:author,
        likes:totalLikes(authorBlogs)
    }))
    return _.maxBy(AuthorBlogLikes,'likes')
}

module.exports = {
totalLikes,
dummy,
favoriteBlog,
mostBlogs,
mostLikes
}