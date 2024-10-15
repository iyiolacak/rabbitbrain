describe("Rabbitbrain Authentication Flow - UI Redirection", () => {
  beforeEach(() => {
    // Visit the sign-up page before each test
    cy.visit("/sign-up");

    // Preserve cookies and local storage across test steps to avoid Clerk session issues
    cy.getCookies().then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });
  });

  // Handle uncaught exceptions, specifically ignoring ClerkJS errors
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("ClerkJS") || err.stack.includes("clerk")) {
      return false; // prevent Clerk errors from failing the test
    }
    // Let other exceptions fail the test
    return true;
  });

  it("should allow user to enter email and proceed with OTP flow", () => {

    // Enter the email address and submit the form
    cy.get('input[name="email"]').type("test+clerk_test@example.com");
    cy.get("button").contains("Send code").click();

    // Verify the user sees the OTP instruction text
    cy.contains("We've just sent you an email").should("be.visible");

    // Simulate entering the OTP code into the input fields
    const otp = ['4', '2', '4', '2', '4', '2'];
    otp.forEach((digit, index) => {
      cy.get(`[data-testid="otp-slot-${index}"]`).type(digit);
    });

    // Submit the OTP
    cy.get("button").contains("Verify").click();

    // Check for redirection or UI elements that only appear after successful login
    cy.contains("Just a second while we set things up...").should("be.visible"); // Example of post-login confirmation
  });
});
