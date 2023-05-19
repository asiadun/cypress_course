describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('https://mailfence.com')
    })
  
    it('Login to mailfence.com', () => {
      cy.get('UserID')
        type('cypqa@mailfence.com') // Input Login
      cy.get('Password').type('cypqa12345')  // Input Password
    })
  
    // it('can add new todo items', () => {
    //   const newItem = 'Feed the cat'
    //   cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
    //   cy.get('.todo-list li')
    //     .should('have.length', 3)
    //     .last()
    //     .should('have.text', newItem)
    // })
})
  