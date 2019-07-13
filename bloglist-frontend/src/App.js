import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setErrorMessage({message: `${user.username} successfully logged in`, success: true})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({message: 'wrong username or password', success: false})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    
    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setErrorMessage({message: `a new blog ${data.title} by ${data.author} added`, success: true})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')        
      })
      .catch(exception => {
        if (exception.toString().includes('401')) {
          setErrorMessage({message: 'You are not authorized to perform this operation', success: false})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        } else {
          setErrorMessage({message: 'Failed to add a new blog', success: false})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        }
      })
  }

  const likeBlog = id => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = {...blog, likes: blog.likes + 1}

    blogService
      .update(id, likedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification notification={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              name="username" 
              onChange={({target}) => setUsername(target.value)} 
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input 
            id="password" 
            type="password" 
            value={password} 
            name="password"
            onChange={({target}) => setPassword(target.value)} 
          />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={errorMessage} />
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="new note">
          <BlogForm 
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            addBlog={addBlog}
          />
        </Togglable>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog}/>
        )}
      </div>
    )
  }
}

export default App
