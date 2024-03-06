import React from 'react';
import {Chart, Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip,} from 'chart.js';
import {Radar} from 'react-chartjs-2';

Chart.defaults.font.family = 'Nunito';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                paddingBottom: "20px",
                fontSize: 16
            }
        },
        subtitle: {
            display: true,
            text: 'Custom Chart Subtitle'
        }

    },
};
export const data = {
    labels: ['React', 'Java', 'Configurazioni', 'Server', 'Frontend', 'Backend', 'React', 'Java', 'Configurazioni', 'Server', 'Fronted', 'Backend',

    ],
    datasets: [
        {
            label: 'Tags',
            data: [50, 70, 80, 50, 50, 50, 30, 50, 50, 50, 50, 20],
            backgroundColor: 'rgba(127,204,207,0.1)',
            borderColor: 'rgb(26,166,161)',
            borderWidth: 1,
        },
    ],
};

export function GraficoSkills() {
    return <Radar data={data} options={options}/>;
}

