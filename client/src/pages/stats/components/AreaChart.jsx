import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonoAreaChart = ({ data, nameKey, dataKey }) => {
    return (
        <AreaChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    );
};

export default MonoAreaChart;