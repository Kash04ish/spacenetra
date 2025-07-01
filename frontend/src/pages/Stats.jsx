import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Activity, CheckCircle, AlertCircle } from "lucide-react";

const statsData = [
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Total Users",
    value: 1243,
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <Activity className="w-6 h-6 text-green-400" />,
    title: "Active Sessions",
    value: 327,
    color: "from-green-500 to-green-700",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-purple-400" />,
    title: "Tasks Completed",
    value: 980,
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: <AlertCircle className="w-6 h-6 text-red-400" />,
    title: "Errors Logged",
    value: 24,
    color: "from-red-500 to-red-700",
  },
];

const chartData = [
  { name: "Mon", users: 400 },
  { name: "Tue", users: 300 },
  { name: "Wed", users: 500 },
  { name: "Thu", users: 700 },
  { name: "Fri", users: 600 },
  { name: "Sat", users: 800 },
  { name: "Sun", users: 900 },
];

export default function Stats() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">📊 Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{stat.title}</h2>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section (Optional) */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Weekly User Growth</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="users" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
