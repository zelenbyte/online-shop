import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Contact page component
 * Handles the contact form submission and displays a thank-you message.
 */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Update form values and clear errors for the changed field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(form.email)) newErrors.email = "Invalid email address.";
    if (!form.subject) newErrors.subject = "Please select a subject.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {submitted ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-10 text-center">
          <div className="text-6xl mb-4 select-none">✅</div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Thank you for your message!</h2>
          <p className="text-gray-700 mb-6">
            We’ve received your message and will get back to you shortly.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Contact Us</h1>

          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Contact Form */}
            <div className="md:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 ${
                      errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 ${
                      errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">-- Select Subject --</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 ${
                      errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col space-y-4">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Our Address</h2>
                <p>Online Shop Inc.</p>
                <p>123 React Street</p>
                <p>Frontend City, JS 45678</p>
                <p>Email: support@onlineshop.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>

              <div className="overflow-hidden rounded-lg shadow-md">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019494347146!2d-122.41941508468137!3d37.77492977975916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858154cb0e9b57%3A0x422c93f2f92946e7!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1695726729871!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Contact;
