describe('Navigation to admin page', () => {
  context("As admin", () => {
    it("should be able to navigate to admin page", () => {
      cy.visit('http://localhost:3000/')

      cy.get('[type=email]').type('dit.subas@gmail.com')
      cy.get('[type=password]').type('foobar')

      cy.wait(1000)

      cy.get('button').click()

      // assert admin is present in breadcrumb
      cy.contains('Admin')

      cy.get('[href="/admin"]').click()
      cy.contains('User')
      cy.contains('Salary')
      cy.contains('Salary Records')
    })
  })
})