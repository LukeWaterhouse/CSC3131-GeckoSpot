import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../Components/Login'
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Login></Login>, div)
  screen.debug
})

it('error message shows if you click login without entering info', () => {
  render(<Login />)
  userEvent.click(screen.getByRole('button'))
  expect(screen.getByText(/Please fill out both fields!/i)).toBeInTheDocument()
})

it('error message shows if you click login without entering info', () => {
  render(<Login />)
  userEvent.type(screen.getByRole('textbox'), 'sampleUsername')
  userEvent.type(screen.getByPlaceholderText(/password/i), 'samplePassword')
  userEvent.click(screen.getByRole('button'))

  expect(screen.queryByText('Please fill out both fields!')).toBeNull()
})

it('login matches snapshot', () => {
  const tree = renderer.create(<Login />).toJSON()
  expect(tree).toMatchSnapshot()
})
