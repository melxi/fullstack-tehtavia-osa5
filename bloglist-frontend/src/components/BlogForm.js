import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = props => {
  const { title, author, url, addBlog } = props

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input {...title.omitreset}/>
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input {...author.omitreset}/>
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input {...url.omitreset}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  addBlog: PropTypes.func.isRequired
}

export default BlogForm