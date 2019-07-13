import React, {useState} from 'react'
const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAll, setShowAll] = useState(false)
  
  return (
    <div style={blogStyle}>
      <div onClick={(event) => setShowAll(!showAll)}>
        {showAll 
          ? <div>
              {blog.title} {blog.author}<br />
              <a href={blog.url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>{blog.url}</a><br />
              {blog.likes} likes<button onClick={(event) => {
                event.stopPropagation()
                likeBlog(blog.id)
              }}>like</button><br />
              added by {blog.user ? blog.user.name : ''}
            </div> 
          : <div>{blog.title} {blog.author}</div>}
      </div>
    </div>
  )
}

export default Blog