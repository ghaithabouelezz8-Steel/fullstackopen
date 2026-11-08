import { useState } from 'react'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'
const BlogForm=({ createBlog }) => {
  const [newBlog,setNewBlog]=useState({ title:'',author:'',url:'' })


  const addBlog=(event) => {
    event.preventDefault()
    createBlog({
      title:newBlog.title,
      author:newBlog.author,
      url:newBlog.url
    })
    setNewBlog({ title:'',author:'',url:'' })
  }
  return(  <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: '40px auto',
        borderRadius: 2
      }}
    >
     <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Create a new Blog
      </Typography>

    <Box component="form" onSubmit={addBlog}>
          <TextField
          label="Blog title"
          value={newBlog.title}
          onChange={event =>
            setNewBlog({ ...newBlog, title: event.target.value })
          }
          fullWidth
          margin="normal"
        />
         <TextField
          label="Blog author"
          value={newBlog.author}
          onChange={event =>
            setNewBlog({ ...newBlog, author: event.target.value })
          }
          fullWidth
          margin="normal"
        />
     <TextField
          label="Blog URL"
          value={newBlog.url}
          onChange={event =>
            setNewBlog({ ...newBlog, url: event.target.value })
          }
          fullWidth
          margin="normal"
        />
          <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          create
        </Button>
    </Box>
  </Paper>

  )
}
export default BlogForm