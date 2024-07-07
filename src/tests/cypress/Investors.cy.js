import Investors from '../../investors/Investors'

describe('<Investors />', () => {
  it('renders investors - assert table headers and values', () => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/investors', {
      fixture: 'investors.json',
    })
    cy.mount(<Investors />)

    const headings = ['FirmId', 'FirmName', 'Type', 'DateAdded', 'Address']

    cy.fixture('investors')
      .then((investors) => {
        investors.forEach((investor) => {
          cy.get('table thead th').then(($th) => {
            const texts = Cypress._.map($th, 'innerText')
            expect(texts, 'headings').to.deep.equal(headings)
          })

          cy.get('table tbody')
            .contains('td', investor.firm_id)
            .should('be.visible')
          cy.get('table tbody')
            .contains('td', investor.firm_name)
            .should('be.visible')
          cy.get('table tbody')
            .contains('td', investor.firm_type)
            .should('be.visible')
          cy.get('table tbody')
            .contains('td', investor.date_added)
            .should('be.visible')
          cy.get('table tbody')
            .contains('td', investor.address)
            .should('be.visible')
        })
      })
      .as('fixtureAllNotStates')
  })
})
