import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Versturen...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          subject: `You received a message in c-dijk from ${formData.name}`,
          name:formData.name,
          text: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("Je bericht is verstuurd!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        const error = await response.json();
        setStatus(`Failed to send message: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again.");
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Contacteer mij</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
            Naam
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Je naam"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
            Telefoon nummer
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Je telefoon nummer"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Je email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-semibold text-gray-700 mb-2">
            Bericht
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Je bericht"
            rows={5}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor:"#62b6a4",
          }}
          disabled={status === "Versturen..."}
        >
          {status === "Versturen..." ? "Versturen..." : "Verstuur"}
        </button>
        {status && (
          <p
            className={`mt-4 text-center font-bold ${
              status === "Je bericht is verstuurd!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;