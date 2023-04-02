import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const GenrePieChart = ({data}) => {
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={400}
        cy={200}
        labelLine={false}
        outerRadius={160}
        fill="#8884d8"
        dataKey="num_movies"
        nameKey="genre"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default GenrePieChart;
