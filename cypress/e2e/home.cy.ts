describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("when normal user is logged in", () => {
    beforeEach(() => {
      cy.fixture("user").then((user) => {
        cy.login(user.email, user.password);
      });
    });

    it("clicking like on a hero should increase their fan count", () => {
      cy.get("app-card")
        .first()
        .as("firstHero")
        .find("[data-cy='fans']")
        .as("fanSpan");

      cy.get("@fanSpan").then((span) => {
        let fanCount = parseInt(span.text());

        cy.get("@firstHero").find("[icon='like']").click();
        cy.get("@fanSpan").should("have.text", fanCount + 1);
      });
    });

    it("user should be able to hire a hero", () => {
      cy.get("app-card")
        .first()
        .as("firstHero")
        .find(".justify-center > :nth-child(3) > .text-xl")
        .as("saveSpan");

      cy.get("@saveSpan").then((span) => {
        let saveCount = parseInt(span.text());

        cy.get("@firstHero").find("[icon='money']").click();
        cy.contains("Hire Hero?").should("be.visible");
        cy.contains("Yes").click();
        cy.get("@saveSpan").should("have.text", saveCount + 1);
      });
    });

    it("user should be able to decline hiring a hero", () => {
      cy.get("app-card")
        .first()
        .as("firstHero")
        .find(".justify-center > :nth-child(3) > .text-xl")
        .as("saveSpan");

      cy.get("@saveSpan").then((span) => {
        let saveCount = parseInt(span.text());

        cy.get("@firstHero").find("[icon='money']").click();
        cy.contains("Hire Hero?").should("be.visible");
        cy.contains("No").click();
        cy.get("@saveSpan").should("have.text", saveCount);
      });
    });
  });

  context("when admin user is logged in", () => {
    beforeEach(() => {
      cy.fixture("admin").then((user) => {
        cy.login(user.email, user.password);
      });
    });

    it("clicking like on a hero should increase their fan count", () => {
      cy.get("app-card")
        .first()
        .as("firstHero")
        .find("[data-cy='fans']")
        .as("fanSpan");

      cy.get("@fanSpan").then((span) => {
        let fanCount = parseInt(span.text());

        cy.get("@firstHero").find("[icon='like']").click();
        cy.get("@fanSpan").should("have.text", fanCount + 1);
      });
    });

    it("user should be able to hire a hero", () => {
      cy.get("app-card")
        .first()
        .as("firstHero")
        .find(".justify-center > :nth-child(3) > .text-xl")
        .as("saveSpan");

      cy.get("@saveSpan").then((span) => {
        let saveCount = parseInt(span.text());

        cy.get("@firstHero").find("[icon='money']").click();
        cy.contains("Hire Hero?").should("be.visible");
        cy.contains("Yes").click();
        cy.get("@saveSpan").should("have.text", saveCount + 1);
      });
    });

    it("clicking edit on a hero should redirect to edit page", () => {
      cy.get("app-card").first().find("[icon='pencil']").click();
      cy.url().should("include", "/edit");
    });

    it("clicking delete on a hero should prompt to delete hero", () => {
      cy.get("app-card").first().find("[icon='trash']").click();
      cy.contains("Delete Hero?").should("be.visible");
    });
  });
});
