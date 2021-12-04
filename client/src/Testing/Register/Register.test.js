import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer'
import Register from '../../Components/Register'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Register></Register>, div)
  screen.debug
})

it('error message shows if you click register without entering info', () => {
  render(<Register />)
  userEvent.click(screen.getByRole('button'))
  expect(screen.getByText(/Please fill out both fields!/i)).toBeInTheDocument()
})

it('error message shows if you click register without entering info', () => {
  render(<Register />)
  userEvent.type(screen.getByRole('textbox'), 'sampleUsername')
  userEvent.type(screen.getByPlaceholderText(/password/i), 'samplePassword')
  userEvent.click(screen.getByRole('button'))

  expect(screen.queryByText('Please fill out both fields!')).toBeNull()
})

it('register matches snapshot', () => {
  const tree = renderer.create(<Register />).toJSON()
  expect(tree).toMatchSnapshot()
})
