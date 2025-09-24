export default function UrlList({ urls }) {
  if (urls.length === 0) return null;

  return (
    <div className="mt-6 w-full max-w-xl space-y-3">
      {urls.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white shadow p-4 rounded-lg hover:shadow-lg transition"
        >
          <span className="truncate text-gray-700 w-2/3">
            {item.redirectURL}
          </span>
          <a
            href={`http://localhost:3000/${item.shortId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline"
          >
            {`/${item.shortId}`}
          </a>
        </div>
      ))}
    </div>
  );
}
