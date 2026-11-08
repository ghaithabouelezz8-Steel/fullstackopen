import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'
import Togglable from './Togglable'

test('the form calls the event handler it received as props with the right details when a new blog is created',async()=>{
    const createBlog = vi.fn()
    render(<Togglable buttonLabel="new Blog">
        <BlogForm createBlog={createBlog}  />
    </Togglable>)

    const button=screen.getByText('new Blog')
    const user = userEvent.setup()
    await user.click(button)

const titleInput = screen.getByRole('textbox', { name: 'Blog title' })
const authorInput = screen.getByRole('textbox', { name: 'Blog author' })
const urlInput = screen.getByRole('textbox', { name: 'Blog URL' })
    const sendButton=screen.getByText('create')
    await user.type(titleInput,'testing the blog form')
    await user.type(authorInput,'Sam')
    await user.type(urlInput,'http/something.com')

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('Sam')

    
})