import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import App from '../App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { INVESTORS_DATA_API } from './API_DATA'

jest.mock('axios')

test('renders default route', async () => {
  render(<App />, { wrapper: BrowserRouter })

  expect(screen.getByText(/Investor app/i)).toBeInTheDocument()
})

test('renders after clicking on Home', async () => {
  render(<App />, { wrapper: BrowserRouter })
  const user = userEvent.setup()

  await user.click(screen.getByText(/Home/i))
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

test('renders investors', async () => {
  const investorsUrl = '/investors'

  axios.get.mockResolvedValue({ data: INVESTORS_DATA_API })

  render(
    <MemoryRouter initialEntries={[investorsUrl]}>
      <App />
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText('FirmId')).toBeInTheDocument()
    expect(screen.getByText('FirmName')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('DateAdded')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
  })

  await waitFor(() => {
    INVESTORS_DATA_API.forEach((investor) => {
      expect(screen.getByText(investor.firm_id)).toBeInTheDocument()
      expect(screen.getByText(investor.firm_name)).toBeInTheDocument()
      expect(screen.getByText(investor.firm_type)).toBeInTheDocument()
      expect(screen.getByText(investor.date_added)).toBeInTheDocument()
      expect(screen.getByText(investor.address)).toBeInTheDocument()
    })
  })
})
