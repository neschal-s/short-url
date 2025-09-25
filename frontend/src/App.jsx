import { useState } from "react";
import axios from "axios";


export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [analyticsUrl, setAnalyticsUrl] = useState(""); // input for analytics
  const [analytics, setAnalytics] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL;
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/url`, { url });
      const id = res.data.shortId; // get shortId from response
      setShortUrl(`${FRONTEND_URL}/${id}`);
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

  const handleAnalytics = async (e) => {
  e.preventDefault();
  if (!analyticsUrl) return alert("Please enter a short URL!");
  
  try {
    const id = analyticsUrl.split("/").pop();
    if (!id) return alert("Invalid short URL");
    
    const res = await axios.get(`${API_URL}/url/analytics/${id}`);
    setAnalytics(res.data);
  } catch (err) {
    console.error("Error fetching analytics:", err);
    setAnalytics(null);
    alert("Failed to fetch analytics. Make sure the short URL is correct.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-200 flex flex-col items-center justify-center p-6 text-center">
      {/* Heading */}
      <h1 className="text-5xl font-light">Tiny links, <span className="text-blue-600">Mighty</span> power!</h1>
      <p className="mt-2 text-lg font-light">
        Shorten your URLs, track clicks, and{" "}
        <span className="text-blue-600">get Analytics.</span>
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


      {shortUrl && (
        <div>
          <h2 className="text-2xl mb-3">Your <span className="text-blue-600">Shortened</span> URL:</h2>
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-semibold hover:underline break-all flex-1 text-left"
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
        </div>
      )}

      <div className="flex flex-col items-center mt-10 mb-10 w-full max-w-md">
        <h2 className="text-3xl font-extralight mb-3">Get <span className="text-blue-600">Analytics</span></h2>
        <div className="flex gap-3 w-full">
          <input
            type="url"
            value={analyticsUrl}
            onChange={(e) => setAnalyticsUrl(e.target.value)}
            placeholder="Enter your short URL..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-black"
          />
          <button
            onClick={handleAnalytics}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Analyse
          </button>
        </div>

        {analytics && (
          <div className="mt-6 bg-white p-2 rounded-xl shadow-md w-full text-left">
            <h3 className="text-xl font-semibold mb-2 text-red-500 text-center">Analytics:</h3>
            <p><strong>Total Clicks:</strong> {analytics.totalClicks}</p>
            <p className="mt-2"><strong>Visit History:</strong></p>
            <ul className="list-disc ml-5 max-h-48 overflow-y-auto">
              {analytics.visitHistory.map((v, index) => (
                <li key={index}>{new Date(v.timestamp).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
