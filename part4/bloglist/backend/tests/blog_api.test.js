const supertest=require('supertest')
const mongoose=require('mongoose')
const app= require('../app')
const assert=require('node:assert')
const {test,after, beforeEach,describe}= require('node:test')
const helper =require('./test-helper')
const Blog =require('../models/blog')


const api =supertest(app)

beforeEach(async()=>{
await Blog.deleteMany({})
for(const item of helper.initialBlogs ){
    const newBlog=new Blog(item)
await  newBlog.save()
}
})

test('all blogs are returned ', async ()=>{
await  api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})


test('A specific blog is returned ', async ()=>{
    const blogs=await helper.blogsInDb()
    const blog=blogs[0]
await  api
    .get(`/api/blogs/${blog.id}`)
    .expect(200)
    .expect('Content-Type',/application\/json/)
})


test('unique identifier is formatted as id ',
    async ()=>{
        
        await api
        .get('/api/blogs')
        .expect(200)

         const blogs=await helper.blogsInDb()
        const keys=Object.keys(blogs[0])
        assert.strictEqual(keys.includes('id'),true)

   
   

    }
)

test('a valid blog can be added',
    async()=>{
        const newBlog={ title: 'Go To Statement Considered Harmful',
      author: 'ibraham',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0 

        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

        const blogs=await helper.blogsInDb()

        assert.strictEqual(blogs.length,helper.initialBlogs.length + 1)
    }
)

test('if the likes property is missing then the value should be turned to 0',
    async()=>{
       const blog ={
        title: 'Go To Statement Considered Harmful',
      author: 'ibraham',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
      
      
       }

  const response=  await  api.post('/api/blogs')
       .send(blog)
       .expect(201)

       const blogs=await helper.blogsInDb()
       assert.strictEqual(response.body.likes,0)
        assert.strictEqual(blogs.length,helper.initialBlogs.length + 1)


    }
)

test('if the url property is missing then',
    async()=>{
          const blog ={
        title: 'Go To Statement Considered Harmful',
      author: 'ibraham',
     
      
      
       }
    await api.post('/api/blogs')
       .send(blog)
       .expect(400)

       const blogs=await helper.blogsInDb()
       assert.strictEqual(blogs.length,helper.initialBlogs.length )
    }
    
)

describe('deletion of a blog',()=>{
    test('succeeds with status 204 if id is valid',
        async()=>{
            const blogsAtStart=await helper.blogsInDb()
            const blogToDelete=blogsAtStart[0]
            await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

            const blogsAtEnd=await helper.blogsInDb()

            const ids=blogsAtEnd.map(blog=>blog.id)
            assert(!ids.includes(blogToDelete.id))
            assert.strictEqual(blogsAtEnd.length,blogsAtStart.length -1)
        }
    )
})

describe('updating of a blog ',()=>{
    test('a blog should be updated ',
        async()=>{
            const blogAtStart=await helper.blogsInDb()
            const blog ={
        title: 'Go To Statement Considered Harmful',
      author: 'ibraham',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
      
      
       }
       const blogToBeUpdated=blogAtStart[0]
       await api
                .put(`/api/blogs/${blogToBeUpdated.id}`)
                .send(blog)
                .expect(200)

        const blogAtEnd=await helper.blogsInDb()
        assert.strictEqual(blogAtEnd.length,blogAtStart.length) 
        const authors=blogAtEnd.map(blog=>blog.author)
        assert(authors.includes('ibraham'))
                
        }
    )
})

test.only('adding a blog fails if token not provided',async()=>{
    const newBlog={
        title:'no token',
        author:'seafood',
        url:'olisetowintheballondor.com',
        likes:5,

    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type',/application\/json/)


})
after(async ()=>{
    await mongoose.connection.close()
})

