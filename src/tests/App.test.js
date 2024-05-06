import { render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import App from '../App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

jest.mock('axios')

test('full app rendering/navigating default route', async () => {
  render(<App />, { wrapper: BrowserRouter })

  expect(screen.getByText(/Investor app/i)).toBeInTheDocument()
})

test('renders not existing page', () => {
  const badRoute = '/not/existing/page'

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
})