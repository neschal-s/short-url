import { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

export default function App() {
  const [urls, setUrls] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700 drop-shadow">
        🚀 URL Shortener
      </h1>
      <UrlForm setUrls={setUrls} />
      <UrlList urls={urls} />
    </div>
  );
}
