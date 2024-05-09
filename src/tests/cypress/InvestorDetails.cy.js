import React from 'react'
import InvestorDetails from '../../investors/InvestorDetails'
import { INVESTORS_DATA_API } from '../API_DATA'

describe('<InvestorDetails />', () => {
  it('renders investor details - assert table headers and values', () => {
    const headings = ['FirmId', 'FirmName', 'Type', 'DateAdded', 'Address']

    cy.mount(<InvestorDetails investors={INVESTORS_DATA_API} />)

    cy.get('table thead th').then(($th) => {
      const texts = Cypress._.map($th, 'innerText')
      expect(texts, 'headings').to.deep.equal(headings)
    })

    INVESTORS_DATA_API.forEach((item) => {
      cy.get('table tbody').contains('td', item.firm_id).should('be.visible')
      cy.get('table tbody').contains('td', item.firm_name).should('be.visible')
      cy.get('table tbody').contains('td', item.firm_type).should('be.visible')
      cy.get('table tbody').contains('td', item.date_added).should('be.visible')
      cy.get('table tbody').contains('td', item.address).should('be.visible')
    })
  })
})
