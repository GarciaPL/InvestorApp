import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'
import { INVESTORS_DATA_API, COMMITMENT_DATA_API } from './API_DATA'

jest.mock('axios')

test('renders investor commitments', async () => {
  const investorsUrl = '/investors'

  axios.get
    .mockResolvedValueOnce({ data: INVESTORS_DATA_API })
    .mockResolvedValueOnce({ data: COMMITMENT_DATA_API })

  render(
    <MemoryRouter initialEntries={[investorsUrl]}>
      <App />
    </MemoryRouter>
  )

  const investor = 'Mjd Jedi fund'

  await waitFor(() => expect(screen.getByText(investor)).toBeInTheDocument())

  const firstTableRow = await screen.findByText(investor)
  fireEvent.click(firstTableRow.parentNode)

  const select_dropdown_placeholder = 'Select asset class'
  await waitFor(() =>
    expect(screen.getByText(select_dropdown_placeholder)).toBeInTheDocument()
  )

  const selectWrapper = screen.getByTestId('asset-class-test-id')
  const input = selectWrapper.firstChild
  fireEvent.keyDown(input, { keyCode: 40 })

  const asset_class = 'Private Equity'
  const asset_class_option = await screen.findByText(asset_class)
  fireEvent.click(asset_class_option)

  await waitFor(() => {
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('FirmID')).toBeInTheDocument()
    expect(screen.getByText('AssetClass')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Currency')).toBeInTheDocument()
  })

  await waitFor(() => {
    COMMITMENT_DATA_API.forEach((investor) => {
      expect(screen.getByText(investor.firm_id)).toBeInTheDocument()
      expect(screen.getByText(investor.asset_class)).toBeInTheDocument()
      expect(screen.getByText(investor.amount)).toBeInTheDocument()
      expect(screen.getByText(investor.currency)).toBeInTheDocument()
    })
  })
})
