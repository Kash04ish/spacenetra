const Contact = () => (
  <div className="p-8 pt-24 bg-gray-900 text-white min-h-screen flex justify-center">
    <div className="w-full max-w-xl">
      <h2 className="text-3xl font-bold mb-4 text-center">📬 Contact Us</h2>
      <form
        method="POST"
        action="https://formspree.io/f/xeoknnkw"
        className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <textarea
          name="message"
          required
          placeholder="Your Message"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
);
export default Contact;
