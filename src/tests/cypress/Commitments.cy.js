import Commitments from '../../investors/commitments/Commitments'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const routeWrappedMount = (WrappedComponent, route, path, options = {}) => {
  window.history.pushState({}, '', route)
  const wrapped = (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={WrappedComponent} path={path} />
      </Routes>
    </MemoryRouter>
  )
  return cy.mount(wrapped, options)
}
Cypress.Commands.add('routeWrappedMount', routeWrappedMount)

describe('<Commitments />', () => {
  it.skip('renders investor commitments - skipped', () => {
    cy.intercept(
      'GET',
      'http://127.0.0.1:8000/api/investor/commitment/re/2670',
      { fixture: 'commitments.json' }
    )
    const route = '/investor/123'
    const path = '/investor/:id'
    cy.routeWrappedMount(<Commitments />, route, path)

    cy.get('#assetClassSelect').type('Real Estate{enter}{enter}')

    const headings = ['ID', 'FirmID', 'AssetClass', 'Amount', 'Currency']

    cy.fixture('commitments').then((commitments) => {
      commitments.forEach((commitment) => {
        cy.get('table thead th').then(($th) => {
          const texts = Cypress._.map($th, 'innerText')
          expect(texts, 'headings').to.deep.equal(headings)
        })

        cy.get('table tbody')
          .contains('td', commitment.firm_id)
          .should('be.visible')
        cy.get('table tbody')
          .contains('td', commitment.firm_name)
          .should('be.visible')
        cy.get('table tbody')
          .contains('td', commitment.firm_type)
          .should('be.visible')
        cy.get('table tbody')
          .contains('td', commitment.date_added)
          .should('be.visible')
        cy.get('table tbody')
          .contains('td', commitment.address)
          .should('be.visible')
      })
    })
  })
  // https://github.com/muratkeremozcan/cypress-react-component-test-examples/blob/master/cypress/component/hooks/kyle-wds/react-router-useParams-component-test/react-router-test-useParams.cy.tsx
})
