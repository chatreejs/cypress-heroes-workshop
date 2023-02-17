declare namespace Cypress {
  interface Chainable {
    /**
     * Loggin in to the application via the UI
     * @example cy.login('user@example.com', 's3cr3t')
     * @param {string} email
     * @param {string} password
     */
    login(email: string, password: string): void;
  }
}
