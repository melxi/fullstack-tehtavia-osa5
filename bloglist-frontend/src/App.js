import React, {useState, useEffect} from 'react';
import loginService from './services/login';
import blogService from './services/blogs';

import Blog from './components/Blog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      })
  
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception)
    }
  }
  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
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
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App;
