import React, {FC} from 'react';
import {formatScore, getLetterGradeColor, LetterGrade} from '../api/gradeEntry';
import Chart from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';

export interface ChartItem {
    name: string;
    score: number;
    grade: LetterGrade;
}

interface ScoreChartProps {
    height: number;
    chartItems: ChartItem[];
}

/**
 * Get max score for score chart.
 * @param scores - Scores to search through
 */
const maxScore = (scores: number[]) => {
    const max = Math.max(...scores);
    // If max greater than 100, increase score ceiling; else, set to 100
    return max > 100 ? Math.round(max) : 100;
};

/**
 * Bar chart for visualizing scores.
 */
const ScoreChart: FC<ScoreChartProps> = props => {
    const {
        height,
        chartItems
    } = props;

    const scores = chartItems.map(item => item.score * 100);

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'bar'
        },
        colors: chartItems.map(item => getLetterGradeColor(item.grade)),
        plotOptions: {
            bar: {
                columnWidth: '60%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },
        grid: {
            row: {
                colors: ['#fff', '#f2f2f2']
            }
        },
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: chartItems.map(item => item.name)
        },
        yaxis: {
            title: {
                text: 'Score'
            },
            min: 0,
            max: maxScore(scores),
            labels: {
                formatter: (val: number) => formatScore(val / 100)
            }
        }
    };
    const series = [{
        name: 'Score',
        data: scores
    }];

    return <Chart options={options} series={series} type={'bar'} height={height}/>
};

export default ScoreChart;
