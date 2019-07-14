import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders blogs title, author and likes', () => {
  const blog = {
    title: 'React-sovellusten testaaminen',
    author: 'Matti Luukkainen',
    likes: 99
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const blogInfo = component.container.querySelector('.blog')
  expect(blogInfo).toHaveTextContent(
    'React-sovellusten testaaminen Matti Luukkainen'
  )

  const likes = component.container.querySelector('.like')
  expect(likes).toHaveTextContent(
    '99'
  )
  console.log(prettyDOM(blogInfo))
  console.log(prettyDOM(likes))
})