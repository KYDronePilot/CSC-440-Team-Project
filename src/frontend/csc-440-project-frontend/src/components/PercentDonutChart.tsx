import React, {FC} from 'react';
import Chart from 'react-apexcharts';
import {formatScore, getLetterGradeColor, LetterGrade} from '../api/gradeEntry';

interface PercentDonutChartProps {
    name: string;
    score: number;
    letterGrade: LetterGrade;
    height: number;
}

const PercentDonutChart: FC<PercentDonutChartProps> = props => {
    const {
        name,
        score,
        letterGrade,
        height
    } = props;

    const options = {
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '60%',
                    margin: 0,
                    background: '#FFFFFF',
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                dataLabels: {
                    name: {
                        color: '#777777',
                        offsetY: -10,
                        show: true,
                        fontSize: '12pt'
                    },
                    value: {
                        formatter: (val: number) => formatScore(val / 100),
                        color: '#111111',
                        fontSize: '20pt',
                        show: true
                    }
                },
                track: {
                    background: '#FFFFFF',
                    strokeWidth: '85%',
                    margin: 0,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                }
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (value: number) => formatScore(value / 100)
            }
        },
        labels: [name],
        colors: [getLetterGradeColor(letterGrade)]
    };

    return (
        <Chart options={options} series={[score * 100]} type={'radialBar'} height={height}/>
    );
};

export default PercentDonutChart;
