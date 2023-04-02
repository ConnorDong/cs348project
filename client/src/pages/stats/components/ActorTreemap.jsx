import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

const ActorTreemap = ({ data }) => {
    return (
        <Treemap
          width={1200}
          height={800}
          data={data}
          dataKey="num_movies"
          stroke="#fff"
          fill="#8884d8"
        />
    );
};

export default ActorTreemap;