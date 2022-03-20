// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('index.js', () => {
    it('loads successfully', () => {
        // cy.visit('http://localhost:3000')
        cy.visit('https://bbp-web-dev.herokuapp.com')
    })
    it('go to accouting page', () => {
        cy.get('#testLink').click()

    })
})
describe('accounting.js', () => {
    it('loads successfully', () => {
        cy.visit('https://bbp-web-dev.herokuapp.com/accounting/')
        // cy.visit('http://localhost:3000/accounting')
    })
    it("get data without user", ()=>{
        cy.get("#getDataBtn").click()
    })

})