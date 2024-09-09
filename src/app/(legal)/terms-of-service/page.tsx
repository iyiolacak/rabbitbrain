import React from 'react'

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 font-serif">Terms of Service</h1>

      <p className="mb-4">
        Welcome to Rabbitbrain! By using this platform, you agree to the following terms. Please read them carefully, and remember—Rabbitbrain is here for your growth and learning.
      </p>

      {/* <!-- Use of Rabbitbrain --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">1. Use of Rabbitbrain</h2>
        <p className="mb-2">
          Rabbitbrain is a free, open-source platform for interactive brain training. We encourage you to use Rabbitbrain to learn, create, and share in a positive way. Please avoid abusing the platform’s resources, like the AI-generated challenges, to ensure everyone can enjoy them.
        </p>
        <p className="mb-2">
          This platform is built by and for the community. Please use it responsibly and help keep Rabbitbrain fun and open for all users.
        </p>
      </section>

      {/* <!-- User Content --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">2. User Content</h2>
        <p className="mb-2">
          When you create and submit challenges or other content, you own that content. By sharing it on Rabbitbrain, you’re giving us permission to display, modify, and share it with others to improve the platform. 
        </p>
        <p className="mb-2">
          We’re all about creativity and collaboration—just make sure your contributions follow the law and don’t infringe on anyone else’s rights.
        </p>
      </section>

      {/* <!-- API Usage and Good Practice --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">3. API Usage and Good Practice</h2>
        <p className="mb-2">
          Rabbitbrain uses AI-powered tools to generate fun, challenging content. We ask that you use these resources mindfully to keep the experience running smoothly for everyone. Our AI APIs are key to the platform, so let's make sure they're used for good!
        </p>
        <p className="mb-2">
          Feel free to explore and challenge yourself, but please don’t overload or misuse the system. By using Rabbitbrain responsibly, you’re helping us maintain a great platform for all.
        </p>
      </section>

      {/* <!-- Liability --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">4. Liability</h2>
        <p className="mb-2">
          Rabbitbrain is offered as-is, and while we strive to provide a smooth and secure experience, we can’t guarantee everything will work perfectly all the time. Use the platform knowing that we're doing our best, but there might be occasional hiccups.
        </p>
      </section>

      {/* <!-- Termination --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">5. Termination</h2>
        <p className="mb-2">
          We hope everyone uses Rabbitbrain in a positive way! But if someone repeatedly misuses the platform or causes harm, we may need to suspend or terminate their access to keep things running smoothly for everyone else.
        </p>
      </section>

      {/* <!-- Governing Law --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">6. Governing Law</h2>
        <p className="mb-2">
          These terms are governed by the laws of the jurisdiction where Rabbitbrain operates. We’re here to keep things fair and open for all users.
        </p>
      </section>

      {/* <!-- Changes to Terms of Service --> */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 font-serif">7. Changes to Terms of Service</h2>
        <p className="mb-2">
          We may occasionally update these terms to keep them current. If we make any big changes, we’ll notify you through the platform. Your continued use of Rabbitbrain means you’re okay with the updated terms.
        </p>
      </section>

      {/* <!-- Contact Information --> */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 font-serif">8. Contact Information</h2>
        <p className="mb-2">
          Got questions or feedback? Feel free to reach out to us at <a href="mailto:rabbitbrain@protonmail.com" className="text-blue-500 underline">rabbitbrain@protonmail.com</a>. We’re always happy to hear from our community!
        </p>
      </section>
    </div>
  )
}

export default TermsOfService
