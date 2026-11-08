import Blog from "./Blog"
import { useParams } from "react-router-dom"
const BlogView=({like,remove,blogs,user})=>{
const id=useParams().id
const blog=blogs.find(blog=>blog.id===id)

if(!blog)
    return <div>'GERRARA HERE'</div>

return(
    <Blog  blog={blog}
    user={user}
    handleLikes={like}
    remove={remove} />
)


}

export default BlogView