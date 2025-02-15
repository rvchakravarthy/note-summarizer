import { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");

    try {
      const response = await axios.post("http://localhost:5000/summarize", { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Failed to generate summary. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Note Summarizer</h1>
      <textarea
        className="w-full max-w-lg h-40 p-3 border rounded shadow-sm"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSummarize}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {summary && (
        <div className="mt-4 p-4 w-full max-w-lg bg-white border rounded shadow">
          <h2 className="font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
