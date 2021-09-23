import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
function GraficPie(props) {
    const stats = props.stats;
    return (
        <PieChart className="pie--only-character" width={250} height={350}>
            <Pie
                dataKey="value"
                isAnimationActive={true}
                data={stats}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Tooltip />
        </PieChart>
    )
}

export default GraficPie
