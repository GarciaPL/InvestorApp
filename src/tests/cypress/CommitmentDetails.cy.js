import CommitmentDetails from '../../investors/commitments/CommitmentDetails'
import { COMMITMENT_DATA_API } from '../API_DATA'

describe('<CommitmentDetails />', () => {
  it('renders investor commitment details - assert table headers and values', () => {
    const headings = ['ID', 'FirmID', 'AssetClass', 'Amount', 'Currency']

    cy.mount(<CommitmentDetails commitments={COMMITMENT_DATA_API} />)

    cy.get('table thead th').then(($th) => {
      const texts = Cypress._.map($th, 'innerText')
      expect(texts, 'headings').to.deep.equal(headings)
    })

    COMMITMENT_DATA_API.forEach((item) => {
      cy.get('table tbody').contains('td', item.id).should('be.visible')
      cy.get('table tbody').contains('td', item.firm_id).should('be.visible')
      cy.get('table tbody')
        .contains('td', item.asset_class)
        .should('be.visible')
      cy.get('table tbody').contains('td', item.amount).should('be.visible')
      cy.get('table tbody').contains('td', item.currency).should('be.visible')
    })
  })
})
