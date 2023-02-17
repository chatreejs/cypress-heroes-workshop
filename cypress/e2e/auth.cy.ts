describe("authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("user should be able to login", () => {
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password);
    });
    cy.contains("Logout").should("be.visible");
  });

  it("user should be able to logout", () => {
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password);
    });

    cy.contains("Logout").as("logout");
    cy.get("@logout").should("be.visible");
    cy.get("@logout").click();

    cy.contains("Login").should("be.visible");
  });
});
