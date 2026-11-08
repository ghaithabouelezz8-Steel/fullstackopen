import { useState, useEffect } from 'react'
import { Container,AppBar,
  Toolbar,
  Button,
  Typography,
  Box } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  Navigate
} from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Succeeded from './components/Succeeded'
import Failed from './components/Failed'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import { useParams, useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const [user,setUser]=useState(null)

  const [successionMessage,setSuccessionMessage]=useState(null)
  const [errorMessage,setErrorMessage]=useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin=async(event) => {
    console.log('Sending credentials:', { username, password })
    event.preventDefault()
    try{
      const user =await loginService.login({ username,password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')

    }
    catch(exception){
      setErrorMessage('failed to log in : wrong username or password ')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log('wrong credentials')
    }
  }


  const logOut=() => {
      localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  setUser(null)
  navigate('/')
  }

  const create=async(newBlog) => {

    try{

      const returnedBlog=await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessionMessage(`the creation of ${returnedBlog.title} succeeded`)
      setTimeout(() => {
        setSuccessionMessage(null)
      }, 5000)
      navigate('/')
    }
    catch(exception){
      setErrorMessage('failed to create a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const remove=async(blog) => {
    await blogService.deleteOne(blog.id)
    setBlogs(blogs.filter(b => b.id!==blog.id))
    navigate('/')
  }

  const like=async(blog) => {

    const likedBlog=await blogService.update(blog.id,{ ...blog,likes:blog.likes +1 })
    setBlogs(blogs.map(b => b.id===blog.id?likedBlog:b))


  }


  return (
    <Container>
    <div>
      
      <AppBar position="static" sx={{ borderRadius: 2, mb: 3 }}>
        <Toolbar>
    <Typography variant="h6" sx={{ mr: 4 }}>
      Blog App
    </Typography>
    
         <Button color="inherit" component={Link} to="/">
      blogs
    </Button>
            {!user && (
      <Button color="inherit" component={Link} to="/login">
        login
      </Button>
    )}
          {user && (
      <Button color="inherit" component={Link} to="/create">
        new blog
      </Button>
    )}
    <Box sx={{ flexGrow: 1 }} />
        {user && (
      <>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {user.name || user.username}
        </Typography>

        <Button color="inherit" onClick={logOut}>
          logout
        </Button>
      </>
    )}
        
</Toolbar>
      </AppBar>
      <Succeeded message={successionMessage} />
<Failed message={errorMessage} />
      <Routes>
        <Route path="/" element={
          <BlogList blogs={blogs} />
        } />
        <Route path="/login" element={
          
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        
        
      />
    
        } />
        <Route path="/create" element={
          user?
          <BlogForm createBlog={create}/>
          :
          <Navigate to={'/login'} replace />
        } />

        <Route 
        path="/blogs/:id/" element={
        <BlogView   blogs={blogs}
      user={user}
      like={like}
      remove={remove}/>}/>
        
      </Routes>
      
    
    </div></Container>
  )
}

export default App