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
    // Mock the Clerk API for sending the OTP email
    cy.intercept("POST", "**/client/sessions", {
      statusCode: 200,
      body: { ok: true }, // Mock a successful OTP send response
    }).as("sendOtp");

    // Mock Clerk's client API to avoid 401 issues
    cy.intercept("GET", "**/client", {
      statusCode: 200,
      body: { client: "mockClientToken" }, // Mock client info
    }).as("getClient");

    // Mock Clerk's client PATCH API to handle client updates
    cy.intercept("PATCH", "**/client", {
      statusCode: 200,
      body: { updated: true }, // Mock client update
    });

    // Enter the email address and submit the form
    cy.get('input[name="email"]').type("test@example.com");
    cy.get("button").contains("Send code").click();
    // Wait for the OTP to be "sent"
    cy.wait("@sendOtp");

    // Verify the user sees the OTP instruction text
    cy.contains("We've just sent you an email").should("be.visible");

    // Mock OTP verification API
    cy.intercept("POST", "**/client/sessions/verify", {
      statusCode: 200,
      body: { session: "mockSessionToken" }, // Mock successful OTP verification
    }).as("verifyOtp");

    // Simulate entering the OTP code into the input fields
    const otp = ['1', '2', '3', '4', '5', '6'];
    otp.forEach((digit, index) => {
      cy.get(`[data-testid="otp-slot-${index}"]`).type(digit);
    });

    // Submit the OTP
    cy.get("button").contains("Verify").click();

    // Wait for the OTP verification response
    cy.wait("@verifyOtp");

    // Check for redirection or UI elements that only appear after successful login
    cy.contains("Just a second while we set things up...").should("be.visible"); // Example of post-login confirmation
  });
});
