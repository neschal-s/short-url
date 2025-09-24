import { useState } from "react";
import axios from "axios";

export default function UrlForm({ setUrls }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/url", { url });
      setUrls((prev) => [...prev, res.data]);
      setUrl("");
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xl bg-white p-4 rounded-xl shadow-md"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a long URL..."
        required
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
      >
        Shorten
      </button>
    </form>
  );
}
