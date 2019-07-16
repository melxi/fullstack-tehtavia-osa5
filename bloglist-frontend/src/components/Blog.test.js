import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('clicking container all info is shown', () => {
  const blog = {
    title: 'React-sovellusten testaaminen',
    author: 'Matti Luukkainen',
    url: 'http://wwww.fullstackopen.com/osa5/react_sovellusten_testaaminen',
    likes: 99,
    user: {
      username: 'Melxi',
      name: 'Muhammad'
    }
  }

  const user = {
    username: 'Melxi',
    name: 'Muhammad Melxi'
  }

  const mockHandler = jest.fn()

  const { getByTestId } = render(
    <Blog blog={blog} user={user} onClick={mockHandler}/>
  )
  const content = getByTestId('container')
  expect(content).toHaveTextContent('React-sovellusten testaaminen Matti Luukkainen')
  expect(content).not.toHaveTextContent('http://wwww.fullstackopen.com/osa5/react_sovellusten_testaaminen')
  expect(content).not.toHaveTextContent('99 likes')
  fireEvent.click(content)

  expect(content).toHaveTextContent('React-sovellusten testaaminen Matti Luukkainen')
  expect(content).toHaveTextContent('http://wwww.fullstackopen.com/osa5/react_sovellusten_testaaminen')
  expect(content).toHaveTextContent('99 likes')
})