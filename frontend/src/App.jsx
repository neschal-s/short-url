import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-gray-300 flex flex-col items-center justify-center p-6 text-center">

      <h1 className="text-5xl font-light">
        Tiny links, Mighty power!
      </h1>

      <p className="mt-2 text-lg font-light">
        Shorten your URLs, track clicks, and <span className="text-red-500">get Analytics.</span>
      </p>


      <div className="flex flex-col items-center mt-10 mb-20">
        <form
          // onSubmit={handleSubmit}
          className="mt-8 w-full max-w-xl bg-white p-5 rounded-2xl shadow-lg flex gap-3"
        >
          <input
            type="url"
            value={url}
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required />
          <button
            // type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
            Shorten
          </button>
        </form>

      </div>
    </div>

  );
}
