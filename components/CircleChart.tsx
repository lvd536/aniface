"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface IProps {
    data: {
        name: string;
        value: number;
    }[];
}

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

export default function CircleChart({ data }: IProps) {
    return (
        <PieChart width={150} height={150}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
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
