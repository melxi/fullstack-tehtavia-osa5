import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'React-sovellusten testaaminen',
    author: 'Matti Luukkainen',
    likes: 99
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})