import React from 'react'

const PrivacyPolicy = () => {
  return (
<div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6 font-serif">Privacy Policy</h1>
    
    <p className="mb-4">
        At Rabbitbrain, we are committed to protecting your privacy. This policy outlines how we handle your personal information.
    </p>

    {/* <!-- Data Collection --> */}
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">1. Data Collection</h2>
        <p className="mb-2">
            We collect minimal data, including your username and email, when you sign up. This may be handled by third-party services like <strong>Clerk</strong> for authentication purposes. Any additional information you provide (e.g., when creating or contributing to challenges) is optional.
        </p>
        <p className="mb-2">
            You can contact us to review, update, or delete your personal information stored on our platform at any time.
        </p>
    </section>

    {/* <!-- Data Usage --> */}
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">2. Data Usage</h2>
        <p className="mb-2">
            Your data is primarily used to improve your experience on Rabbitbrain. For instance, we might use it to tailor challenges to your preferences and skill level. We do not sell or share your personal information with third parties, except for essential services that facilitate the platform, such as <strong>Convex</strong> for backend services.
        </p>
    </section>

    {/* <!-- Cookies --> */}
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">3. Cookies</h2>
        <p className="mb-2">
            We use cookies to enhance functionality, such as remembering your login session via services like <strong>Clerk</strong>. You can disable cookies in your browser settings, but doing so may limit your ability to use certain features of Rabbitbrain.
        </p>
    </section>

    {/* <!-- Third-Party Links --> */}
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">4. Third-Party Links</h2>
        <p className="mb-2">
            Rabbitbrain may include links to third-party websites. We are not responsible for the privacy practices or the content of these sites. We encourage you to review the privacy policies of any third-party site you visit.
        </p>
    </section>

    {/* <!-- Data Protection --> */}
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">5. Data Protection</h2>
        <p className="mb-2">
            We take security seriously and implement appropriate measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security. We advise using strong, unique passwords and safeguarding your account details.
        </p>
    </section>

    {/* <!-- Updates to Privacy Policy --> */}
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">6. Updates to Privacy Policy</h2>
        <p className="mb-2">
            We may update this Privacy Policy from time to time. When we do, we will notify you via email or a prominent notice on our website. Your continued use of Rabbitbrain after any changes to the policy means you accept the updates.
        </p>
    </section>

    {/* <!-- Contact Information --> */}
    <section>
        <h2 className="text-2xl font-semibold mb-4 font-serif">7. Contact Information</h2>
        <p className="mb-2">
            If you have any questions or concerns about this Privacy Policy or your personal data, feel free to reach out to us at <a href="mailto:rabbitbrain@protonmail.com" className="text-blue-500 underline">rabbitbrain@protonmail.com</a>.
        </p>
    </section>
</div>
  )
}

export default PrivacyPolicy