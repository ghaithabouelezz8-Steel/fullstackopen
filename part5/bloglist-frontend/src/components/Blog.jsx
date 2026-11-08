const Blog = ({ blog, handleLikes, remove, user }) => {
  return (
    <div className="blog">
      <h2>{blog.title}</h2>

      <div>{blog.author}</div>

      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>

      <div>
        likes: {blog.likes}

        {user && (
          <button onClick={() => handleLikes(blog)}>
            like
          </button>
        )}
      </div>

      <div>
        added by {blog.user?.name || blog.user?.username}
      </div>

      {user && user.username === blog.user?.username && (
        <button onClick={() => remove(blog)}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog