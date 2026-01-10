"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
    { name: "Романтика", value: 40 },
    { name: "Драма", value: 30 },
    { name: "Комедия", value: 20 },
    { name: "Другие", value: 10 },
];

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

export default function CircleChart() {
    return (
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
            >
                {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}
