import React from 'react'

const BlogForm = props => {
  const {title, setTitle, author, setAuthor, url, setUrl, addBlog} = props
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input 
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input 
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm