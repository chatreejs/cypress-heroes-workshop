describe("New Hero", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("admin").then((admin) => {
      cy.login(admin.email, admin.password);
    });
  });

  afterEach(() => {
    cy.get("app-card").last().find("[icon='trash']").click();
    cy.contains("Delete Hero?").should("be.visible");
    cy.contains("Yes").click();
  });

  it("should create a new hero", () => {
    cy.get("app-card")
      .as("heroes")
      .then((card) => {
        let heroCount = card.length;

        cy.contains("Create New Hero").click();
        cy.url().should("include", "/heroes/new");

        cy.fixture("hero").then((hero) => {
          cy.get("[label=Name]").find("input").type(hero.name);
          cy.get("[label=Price]").find("input").clear().type(hero.price);

          // Selecting single option
          // cy.get("[label=Power]").find("select").select(hero.powers[0]);

          // Selecting multiple options
          cy.get("[label=Powers]").find("select").select(hero.powers);

          // File upload
          cy.get("[label=Avatar]")
            .find("input")
            .selectFile(`cypress/fixtures/${hero.image}`);

          cy.contains("Submit").click();

          cy.get("@heroes").should("have.length", heroCount + 1);
          cy.get("@heroes").last().contains(hero.name);
        });
      });
  });
});
