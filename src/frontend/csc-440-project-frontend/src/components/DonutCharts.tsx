import React, {FC} from 'react';
import Chart from 'react-apexcharts';
import {cloneDeep} from 'lodash';
import {formatScore, getGpaColor, getLetterGradeColor, LetterGrade} from '../api/gradeEntry';
import {formatGpa, NO_GPA} from '../api/semester';

const chartOptions = {
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
                    formatter: (val: number) => '',
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
            formatter: (val: number) => ''
        }
    },
    labels: [''],
    colors: ['']
};

interface DonutChartProps {
    name: string;
    value: number;
    color: string;
    height: number;
    valueFormatter: (val: number) => string;
    tooltipFormatter: (val: number) => string;
}

export const DonutChart: FC<DonutChartProps> = props => {
    const {
        name,
        value,
        color,
        height,
        valueFormatter,
        tooltipFormatter
    } = props;

    let options = cloneDeep(chartOptions);
    options.plotOptions.radialBar.dataLabels.value.formatter = valueFormatter;
    options.tooltip.y.formatter = tooltipFormatter;
    options.labels = [name];
    options.colors = [color];

    return (
        <Chart options={options} series={[value]} type={'radialBar'} height={height}/>
    );
};

interface GradeScoreDonutChart {
    name: string;
    score: number;
    letterGrade: LetterGrade;
    height: number;
}

export const GradeScoreDonutChart: FC<GradeScoreDonutChart> = props => {
    const {
        name,
        score,
        letterGrade,
        height
    } = props;

    return (
        <DonutChart
            name={name}
            value={score * 100}
            color={getLetterGradeColor(letterGrade)}
            height={height}
            valueFormatter={val => formatScore(val / 100)}
            tooltipFormatter={val => formatScore(val / 100)}
        />
    );
};

interface GpaDonutChartProps {
    name: string;
    height: number;
    gpa: number;
}

export const GpaDonutChart: FC<GpaDonutChartProps> = (props) => {
    const {
        name,
        height,
        gpa
    } = props;
    let value;
    if (gpa === NO_GPA)
        value = 0;
    else
        value = (gpa / 4.0) * 100;

    return (
        <DonutChart
            name={name}
            value={value}
            color={getGpaColor(gpa)}
            height={height}
            valueFormatter={() => formatGpa(gpa)}
            tooltipFormatter={() => formatGpa(gpa)}
        />
    );
};
