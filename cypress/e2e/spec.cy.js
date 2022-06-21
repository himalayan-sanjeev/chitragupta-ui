describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.contains('Login')

    cy.contains('E-mail')
    cy.contains('Password')
    cy.contains('Forgot Password')

    // write email
    cy.get('[type=email]').type('dit.subas@gmail.com')
    cy.get('[type=password]').type('foobar')

    // cy.wait(1000)

    cy.get('button').click()

    cy.contains('Dashboard')
    cy.contains('Calendar')
    cy.contains('Admin')

    cy.get('[href="/admin"]').click()
    cy.contains('User')
    cy.contains('Salary')
    cy.contains('Salary Records')


    cy.get('button').first().click()
  })
})
