import React, {FC} from 'react';
import {getGpaColor} from '../api/gradeEntry';
import {ApexOptions} from 'apexcharts';
import {formatGpa} from '../api/semester';
import Chart from 'react-apexcharts';

interface GpaDonutChartProps {
    name: string;
    height: number;
    gpa: number;
}

/**
 * Convert GPA to percentage.
 * @param gpa - GPA to convert
 */
const gpaToPercent = (gpa: number) => {
    return (gpa / 4.0) * 100;
};

export const GpaDonutChart: FC<GpaDonutChartProps> = (props) => {
    const {
        name,
        height,
        gpa
    } = props;

    const options: ApexOptions = {
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
                        formatter: () => formatGpa(gpa),
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
                formatter: () => formatGpa(gpa)
            }
        },
        labels: [name],
        colors: [getGpaColor(gpa)]
    };

    return (
        <Chart options={options} series={[gpaToPercent(gpa)]} type={'radialBar'} height={height}/>
    );

};

export default GpaDonutChart;
