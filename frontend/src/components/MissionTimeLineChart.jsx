import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const MissionTimelineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default MissionTimelineChart;


