import React from 'react'
import ReactDOM from 'react-dom'
import Post from '../../../Components/Post'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Post></Post>, div)
  screen.debug
})

it('renders post correctly', () => {
  const { getByTestId } = render(
    <Post
      date="21/11/25"
      userName="Luke"
      content="content text for testing"
    ></Post>
  )
  expect(getByTestId('data-postdateid')).toHaveTextContent('21/11/25')
  expect(getByTestId('data-postusernameid')).toHaveTextContent('Luke')
  expect(getByTestId('data-postcontentid')).toHaveTextContent(
    'content text for testing'
  )
})

it('post matches snapshot', () => {
  const tree = renderer
    .create(
      <Post
        date="21/11/25"
        userName="Luke"
        content="content text for testing"
      ></Post>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
