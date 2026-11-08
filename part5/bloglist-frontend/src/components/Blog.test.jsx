import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'




test('the event handler is called twice when the like button is pressed twice',async()=>{
    const blog={id: '5a422a851b54a676234d17f7',
  title: 'Canonical String Reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/users/EWD/ewd06xx/EWD623.PDF',
  likes: 12,
  user: {
    username: 'mluukkai',
    name: 'Matti Luukkainen'
  }
}
const remove=vi.fn()
const like=vi.fn()

render(<Blog user={{username:'mluukkai'}} blog={blog} remove={remove} handleLikes={like}/>)

const user=userEvent.setup()

const likeButton=screen.getByText('like')
await user.click(likeButton)
await user.click(likeButton)

expect(like.mock.calls).toHaveLength(2)

})
test('Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed ',async()=>{
  const blog = {
    id: '123',
    title: 'Canonical stack items',
    author: 'Robert C. Martin',
    url: 'https://example.com',
    likes: 12,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
  render(
    <Blog user={null} blog={blog} handleLikes={vi.fn()} remove={vi.fn()}/>
  )

  expect(screen.getByText('Canonical stack items')).toBeVisible()
  expect(screen.getByText('likes: 12')).toBeVisible()
  expect(screen.queryByRole('button',{name:'like'})).not.toBeInTheDocument()
  expect(screen.queryByRole('button',{name:'remove'})).not.toBeInTheDocument()

})
test('Authenticated users who are the blog`s creator are shown both the like button and the remove button',async()=>{
  const blog = {
    id: '123',
    title: 'Canonical stack items',
    author: 'Robert C. Martin',
    url: 'https://example.com',
    likes: 12,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
  render(
    <Blog user={{ username: 'mluukkai' }} blog={blog} handleLikes={vi.fn()} remove={vi.fn()}/>
  )

  expect(screen.getByText('Canonical stack items')).toBeVisible()
  expect(screen.getByText('likes: 12')).toBeVisible()
  expect(screen.queryByRole('button',{name:'like'})).toBeInTheDocument()
  expect(screen.queryByRole('button',{name:'remove'})).toBeInTheDocument()


})
test('Authenticated users who are not the blog`s creator are shown only the like button',async()=>{
  const blog = {
    id: '123',
    title: 'Canonical stack items',
    author: 'Robert C. Martin',
    url: 'https://example.com',
    likes: 12,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
  render(
    <Blog user={{ username: 'notmluukkai' }} blog={blog} handleLikes={vi.fn()} remove={vi.fn()}/>
  )

  expect(screen.getByText('Canonical stack items')).toBeVisible()
  expect(screen.getByText('likes: 12')).toBeVisible()
  expect(screen.queryByRole('button',{name:'like'})).toBeInTheDocument()
  expect(screen.queryByRole('button',{name:'remove'})).not.toBeInTheDocument()


})