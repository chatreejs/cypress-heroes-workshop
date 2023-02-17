// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", (email, password) => {
  Cypress.log({
    name: "login",
    message: email,
    consoleProps: () => {
      return {
        email,
        password,
      };
    },
  });

  cy.contains("Login", { log: false }).click({ log: false });
  cy.get("input[type=email]", { log: false }).type(email, { log: false });
  cy.get("input[type=password]", { log: false }).type(password, { log: false });
  cy.contains("Sign in", { log: false }).click({ log: false });
});
