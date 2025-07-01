export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-500">🚀 About SpaceNetra</h1>
        <div className="w-48 h-1 mx-auto bg-blue-500 rounded-full mb-8 animate-pulse" />
        
        {/* Problem Statement */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-2 text-blue-300">🧠 Problem Statement</h2>
          <p className="px-12 text-lg text-red-500 leading-relaxed text-gray-300">
            Build an AI-based Help Bot for Information Retrieval from a Knowledge Graph Based on Static/Dynamic Web Portal Content.
          </p>
        </section>

        {/* Project Idea */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-blue-300">💡 Project Idea</h2>
          <p className="px-12 text-lg text-green-500 leading-relaxed text-gray-300">
            We propose to develop a smart chatbot, <strong>'SpaceNetra AI Bot'</strong>, that can answer user queries related
            to space missions, satellites, ISRO content, and more. The bot will retrieve structured information
            from a knowledge graph created using static and dynamic content from verified web sources (e.g., ISRO, Wikipedia).
            It will act like an intelligent assistant for space information.
          </p>
        </section>

        {/* Project Overview */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-blue-300">🌌 Project Overview:</h2>
          <p className="px-12 text-lg text-yellow-500 leading-relaxed text-gray-300">
            SpaceNetra AI Bot is a smart assistant designed to extract structured information
            from both static and dynamic sources like ISRO portals and Wikipedia. By leveraging
            a knowledge graph backend and AI/NLP tools, the bot delivers accurate, interactive,
            and insightful responses for space-related queries.
          </p>
        </section>

        {/* Core Features */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">🛠️ Core Features:</h2>
          <ul className="px-12 text-pink-500 list-disc list-inside text-gray-300 space-y-2 text-lg">
            <li>  Natural Language Query Input: Ask questions in plain English.</li>
            <li>  Knowledge Graph Backend: Scraped, cleaned data from ISRO portals in Neo4j/RDF/JSON.</li>
            <li>  Interactive Chatbot Interface: Intuitive UI for seamless communication.</li>
            <li>  GPT-Enhanced Answers: AI fills in gaps when graph data is insufficient.</li>
            <li>  Follow-Up Handling: Maintains context across multi-turn conversations.</li>
            <li>  Visualization Generator: Auto-creates insightful charts (e.g., mission timelines, launch rates).</li>
            <li>  Insight Discovery: Detects trends like satellite launches, mission types, etc.</li>
            <li>  Multilingual Support: Optional support for Hindi and regional languages.</li>
            <li>  Source Citation: Every answer includes credible links.</li>
            <li>  User Feedback Loop: Users can rate answers to improve response quality.</li>
          </ul>
        </section>

        {/* Out-of-the-Box Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">✨ Out-of-the-Box Future Implementation:</h2>
          <ul className="px-12 text-purple-500 list-disc list-inside text-gray-300 space-y-2 text-lg">
            <li>Voice Query Input: Enables hands-free space exploration.</li>
            <li>Telegram/WhatsApp Bot Integration: Ask questions through your favorite platforms.</li>
            <li>Mission Recommender: Personalized mission suggestions based on user interest.</li>
            <li>Augmented Reality Support: 3D visualization of ISRO spacecraft and launch sequences.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
