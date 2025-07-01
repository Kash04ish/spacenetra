
// Generate a random date between two dates
function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
// Sample blog data with dates
const blogs = [
    {
    title: "How SpaceNetra Detects Trends in Space Missions",
    desc: "We use time-series graph analysis to identify launch patterns, mission categories, and technology shifts across ISRO data.",
  },
  {
    title: "Integrating Wikipedia as a Dynamic Data Source",
    desc: "Learn how we extract clean, structured data from Wikipedia to enrich our knowledge graph with real-time updates.",
  },
  {
    title: "Making Space Data Accessible to Students & Researchers",
    desc: "SpaceNetra serves as a knowledge assistant for learners, helping decode space mission data without technical barriers.",
  },
  {
    title: "How We Ensure the Credibility of Every Response",
    desc: "Every AI-generated or graph-based answer includes real-time citations from trusted sources to ensure factual accuracy.",
  },
  {
    title: "Building a Mission Recommender Engine",
    desc: "We designed a personalized system that suggests ISRO missions based on user queries, interest tags, and history.",
  },
  {
    title: "Smart Chat UI: Designing for Technical and Non-Tech Users",
    desc: "Explore our design process behind the chat UI that balances advanced query handling with ease of use.",
  },
  {
    title: "Optimizing Neo4j Queries for Fast Response Times",
    desc: "We fine-tuned Cypher queries to ensure the chatbot delivers results in milliseconds even with complex graph paths.",
  },
  {
    title: "How SpaceNetra Can Support Government Portals",
    desc: "Our bot framework is extendable to other government data platforms for transparency and citizen engagement.",
  },
  {
    title: "Building a Knowledge Graph from ISRO Web Data",
    desc: "How we structured ISRO mission data into a Neo4j knowledge graph to power intelligent space search.",
    date: "May 12, 2025",
  },
  {
    title: "Enabling Natural Language Understanding with AI",
    desc: "How our bot understands user queries in plain English using NLP models for smarter retrieval.",
    date: "May 24, 2023",
  },
  {
    title: "From Static Pages to Smart Answers",
    desc: "Our custom ETL pipeline turns static content into dynamic graph knowledge for fast, factual replies.",
    date: "June 3, 2023",
  },
  {
    title: "Why We Chose Neo4j for Graph-Based AI",
    desc: "Graph databases like Neo4j help us represent relationships between missions, satellites, and more.",
    date: "June 9, 2022",
  },
  {
    title: "GPT Meets Graph: A Hybrid Approach",
    desc: "When our graph falls short, GPT steps in to give intelligent, factual responses to user questions.",
    date: "June 16, 2025",
  },
  {
    title: "Visualizing ISRO's Journey with Charts",
    desc: "We built mission timelines, launch rates, and success charts to turn space data into insight.",
    date: "June 21, 2021",
  },
  {
    title: "Multilingual AI: Supporting Hindi & More",
    desc: "We break language barriers by enabling regional queries through multilingual NLP processing.",
    date: "June 25, 2025",
  },
  {
    title: "Voice Query Support for Accessibility",
    desc: "Voice-enabled input allows hands-free access to space knowledge — perfect for everyone.",
    date: "July 1, 2025",
  },
  {
    title: "User Feedback Loop for Smarter AI",
    desc: "Every feedback improves SpaceNetra’s responses by training the model on real user ratings.",
    date: "July 4, 2022",
  },
].map((blog) => ({
  ...blog,
  date: getRandomDate(new Date(2020, 4, 1), new Date(2025, 6, 15)), // Between May 1 and July 15
}));

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-4">
        📝 SpaceNetra Blog
      </h1>
      <div className="w-48 h-1 mx-auto bg-blue-500 rounded-full mb-12 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-md p-6 hover:scale-105 transform transition duration-300 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-blue-300 mb-2">
              {blog.title}
            </h2>
            <p className="text-sm text-gray-400 italic mb-2">{blog.date}</p>
            <p className="text-gray-300 text-sm">{blog.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}