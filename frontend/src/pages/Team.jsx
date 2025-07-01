const Team = () => {
  const teamMembers = [
    {
      name: "Kashish Verma",
      role: "Full Stack Developer",
      bio: "Experienced in building intelligent AI-driven platforms and full-stack apps using React, Node.js, Python, and GenAI APIs. Led projects like SmartPing, EarlyVision, and SpaceNetra. Passionate about hackathons and real-world problem solving.",
    },
    {
      name: "Aska",
      role: "Frontend Engineer",
      bio: "Crafts seamless user interfaces with clean, accessible code. Specializes in React, Tailwind CSS, and responsive web design. Aska ensures SpaceNetra feels intuitive across devices and screen sizes.",
    },
    {
      name: "Priyanshu",
      role: "Team Lead & Prompt Engineer",
      bio: "Drives system architecture and AI model development through prompts. He built the team,  mission and vision of SpaceNtra.",
    },
  ];

  return (
    <div className="p-8 bg-gray-950 text-white min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-10">
        👨‍🚀 Meet Our Team
      </h2>
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2 text-white">{member.name}</h3>
            <p className="text-blue-300 font-medium mb-3">{member.role}</p>
            <p className="text-sm text-gray-300 text-justify">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
