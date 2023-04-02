import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MovieReleasesByYear = ({ data, nameKey, dataKey }) => {
    return (
        <BarChart
            width={1000}
            height={500}
            data={data}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
    );
};

export default MovieReleasesByYear;