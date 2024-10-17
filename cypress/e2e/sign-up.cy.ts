// cypress/integration/authentication_flow.spec.js

describe("Rabbitbrain Authentication Flow - UI Redirection", () => {
  // Handle uncaught exceptions, specifically ignoring ClerkJS errors
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("ClerkJS") || err.stack.includes("clerk")) {
      console.warn("ClerkJS initialization error:", err);
      return false; // Prevent Clerk errors from failing the test
    }
    throw err; // Let other exceptions fail the test
  });

  beforeEach(() => {
    // Visit the sign-up page and ensure it's fully loaded
    cy.visit("/sign-up");
    cy.contains("Sign up").should("be.visible");

    // Wait for ClerkJS to initialize
    cy.window().its("Clerk").should("exist");
  });

  it("should allow user to enter email and proceed with OTP flow", () => {
    // Enter the email address and submit the form
    cy.get('input[name="email"]').type("test+clerk_test@example.com");
    cy.get("button").contains("Send code").click();

    // Verify the user sees the OTP instruction text
    cy.contains("We've just sent you an email").should("be.visible");

    // Simulate entering the OTP code into the input fields
    const otp = ["4", "2", "4", "2", "4", "2"];
    otp.forEach((digit, index) => {
      cy.get(`[data-testid="otp-slot-${index}"]`).type(digit);
    });

    // Submit the OTP
    cy.get("button").contains("Verify").click();

    // Check for redirection or UI elements that only appear after successful login
    cy.contains("Just a second while we set things up...").should("be.visible");
  });
});
