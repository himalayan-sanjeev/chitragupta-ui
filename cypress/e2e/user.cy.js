describe('Navigation to admin page', () => {
  context("As normal user", () => {
    it("should not be able to navigate to admin page", () => {
      cy.visit('http://localhost:3000/')

      cy.get('[type=email]').type('sagar1@gmail.com')
      cy.get('[type=password]').type('foobar')

      cy.wait(1000)

      cy.get('button').click()

      cy.get('[href="/admin"]').should('not.exist')

      // navigate without pressing on link
      cy.request('http://localhost:3000/admin')
      cy.location('pathname').should('eq', '/')
    })
  })
})
