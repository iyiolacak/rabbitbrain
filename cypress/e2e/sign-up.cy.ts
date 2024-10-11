describe("Rabbitbrain Authentication Flow - UI Redirection", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/sign-up");
  });

  it("should allow user to enter email and proceed with OTP flow", () => {
    // Intercept Clerk API for sending email
    cy.intercept("POST", "**/client/sessions", {
      statusCode: 200,
      body: { ok: true }, // Mock successful response for sending OTP
    }).as("sendOtp");

    // Enter email and submit the form
    cy.get('input[name="email"]').type("test@example.com");
    cy.get("button").contains("Send code").click();

    // Wait for the OTP to be "sent"
    cy.wait("@sendOtp");

    // Verify redirection to the OTP input page (UI change, no URL change)
    cy.contains("We've just sent you an email").should("be.visible");

    // Intercept OTP verification API
    cy.intercept("POST", "**/client/sessions/verify", {
      statusCode: 200,
      body: { session: "mockSessionToken" }, // Mock successful OTP verification
    }).as("verifyOtp");

    // Simulate entering the OTP code into 6 separate input fields
    cy.get('[data-testid="otp-slot-0"]').type("1");
    cy.get('[data-testid="otp-slot-1"]').type("2");
    cy.get('[data-testid="otp-slot-2"]').type("3");
    cy.get('[data-testid="otp-slot-3"]').type("4");
    cy.get('[data-testid="otp-slot-4"]').type("5");
    cy.get('[data-testid="otp-slot-5"]').type("6");

    // Mock pressing enter to submit OTP
    cy.get("button").contains("Verify").click();

    // Wait for OTP verification
    cy.wait("@verifyOtp");

    // Assert redirection based on UI (check for elements on the homepage/dashboard)
    cy.contains("Just a second while we set things up...").should("be.visible"); // Example of checking for a visible element that only appears after successful login
  });
});
