const {test,describe}=require('node:test')
const assert=require('node:assert')
const listHelper=require('./utils/list_helper')

test('test dummy return 1',()=>{
    const blogs=[]

    const results=listHelper.dummy(blogs)

    assert.strictEqual(results,1)
})

describe('total likes ',()=>{
    const  listWithOneBlog=[
        {
 _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
        }
    ]
test('when list has only one blog, equals the likes of that ',()=>{
    const results=listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(results,5)
})
})

describe('most liked post ',()=>{
    const blogs=[
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
            _id: '5a422aa71b54a676234d17f10',
      title: 'Go To Statement Considered Harmful',
      author: 'Erwin smith',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 4,
      __v: 2
        }
    ]

    test('the most liked post must be ',()=>{
        const results=listHelper.favoriteBlog(blogs)

        assert.deepStrictEqual(results,blogs[1])
    })
})

describe('author with the most blogs ',()=>{
    const blogs = [
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
    { title: 'First Patterns', author: 'Robert C. Martin', likes: 10 },
    { title: 'Second Patterns', author: 'Robert C. Martin', likes: 5 },
    { title: 'Third Patterns', author: 'Robert C. Martin', likes: 0 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 }
  ];

    test('the author with the most blogs should be ',()=>{
        const results=listHelper.mostBlogs(blogs)

        assert.deepStrictEqual(results,{
            author:'Robert C. Martin',
            blogs:3
        })
    })
})

describe('author with the most likes ',()=>{
    const blogs = [
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
    { title: 'First Patterns', author: 'Robert C. Martin', likes: 10 },
    { title: 'Second Patterns', author: 'Robert C. Martin', likes: 5 },
    { title: 'Third Patterns', author: 'Robert C. Martin', likes: 0 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 }
  ];

    test('the author with the most likes should be ',()=>{
        const results=listHelper.mostLikes(blogs)

        assert.deepStrictEqual(results,{
            author:'Edsger W. Dijkstra',
            likes:17
        })
    })
})