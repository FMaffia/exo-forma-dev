import React from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true
};

const labels = ['Tic Tac Toe', 'Annotazioni Java', 'Reflections'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Totale Step',
            data: [30, 50, 90],
            backgroundColor: 'rgba(127,204,207,0.41)',
            borderColor: 'rgb(26,166,161)',
            borderWidth: 1,
        },
        {
            label: 'Step completati',
            data: [15, 10, 80],
            backgroundColor: 'rgba(127,204,207,0.1)',
            borderColor: 'rgb(26,166,161)',
            borderWidth: 1,
        },
    ],
};

export function GraficoCompletamento() {
    return <Bar options={options} data={data}/>;
}
