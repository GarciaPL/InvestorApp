import React from 'react'
import App from '../../App'

describe('<App />', () => {
  it('title with home and investors buttons', () => {
    cy.mount(<App />)

    cy.get('h1[id="title"]').contains('Investor App').should('exist')
    cy.get('#HomeButton').contains('Home').should('exist')
    cy.get('#InvestorsButton').contains('Investors').should('exist')
  })
})
