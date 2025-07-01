import { useEffect, useState } from "react";
import MissionTimelineChart from "../components/MissionTimeLineChart";
import MissionTypePieChart from "../components/MissionTypePieChart";

const Home = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [chartData, setChartData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [showFullAnswer, setShowFullAnswer] = useState(false); // For collapsible section
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 5;

  const handleQuery = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/missions-overview`)
      .then(res => res.json())
      .then(data => {
        const countsByYear = data.missions.reduce((acc, m) => {
          acc[m.year] = (acc[m.year] || 0) + 1;
          return acc;
        }, {});
        const yearData = Object.entries(countsByYear).map(([year, count]) => ({ year, count }));
        setChartData(yearData);

        const countsByType = data.missions.reduce((acc, m) => {
          acc[m.type] = (acc[m.type] || 0) + 1;
          return acc;
        }, {});
        const typeChartData = Object.entries(countsByType).map(([type, count]) => ({ type, count }));
        setTypeData(typeChartData);
      });
  }, []);

  // Split answer into paragraphs/cards
  const parsedAnswer = answer ? answer.split("\n").filter(line => line.trim()) : [];
  const totalPages = Math.ceil(parsedAnswer.length / itemsPerPage);
  const paginatedAnswer = parsedAnswer.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-8 bg-gray-800 min-h-screen px-16">
     <h1 className="text-5xl text-pink-700 font-bold mb-4">🤖 Ask SpaceNetra</h1>
     <h2 className="text-2xl text-white mb-6">Use our AI bot to ask questions about missions, ISRO, timelines, and more.</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-1 flex-1 w-full"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleQuery();
          }}
          placeholder="🔍 Ask about an ISRO mission..."
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleQuery}>Ask</button>
      </div>

      {/* Answer display with cards */}
      {answer && answer !== "None" && (
        <div className="bg-white rounded shadow p-4 mb-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">🛰️ Mission Details</h2>
          {paginatedAnswer.map((line, idx) => (
            <div
              key={idx}
              className="p-3 border rounded-md bg-gray-50 flex items-start gap-2"
            >
              <span>📌</span>
              <p className="whitespace-pre-line">{line}</p>
            </div>
          ))}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
      )}

      <h2 className="text-xl text-white font-semibold mt-8 mb-2">📊 Mission Timeline</h2>
      <MissionTimelineChart data={chartData} />
      <MissionTypePieChart data={typeData} />
    </div>
  );
};

export default Home;
