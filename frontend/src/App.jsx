import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/url", { url });
      setShortUrl(`http://localhost:3000/${res.data.shortId}`);
      setUrl("");
      setCopied(false); // reset copied state for new URL
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-gray-300 flex flex-col items-center justify-center p-6 text-center">
      {/* Heading */}
      <h1 className="text-5xl font-light">Tiny links, Mighty power!</h1>

      <p className="mt-2 text-lg font-light">
        Shorten your URLs, track clicks, and{" "}
        <span className="text-red-500">get Analytics.</span>
      </p>

      {/* Input box */}
      <div className="flex flex-col items-center mt-10 mb-20">
        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full max-w-xl bg-white p-5 rounded-2xl shadow-lg flex gap-3"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Shorten
          </button>
        </form>
      </div>

      {/* Result box */}
      {shortUrl && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline break-all flex-1 text-left"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded-md text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
