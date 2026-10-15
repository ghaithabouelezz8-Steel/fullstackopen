const Blog = require('../models/blog')
const User = require ('../models/user')

const initialBlogs = [
 {
           _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0 
        },
        {
            _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 6,
      __v: 1
        },
        {
            _id: '5a422aa71b54a676234d17f0',
      title: 'Go To Statement Considered Harmful',
      author: 'Erwin smith',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 4,
      __v: 2
        }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'https://example.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}



const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb=async()=>{
  const users=await User.find({})
  return users.map(user=>user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb
}