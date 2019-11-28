import React, {FC} from 'react';
import Chart from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';
import {formatScore} from '../api/gradeEntry';

interface WeightDonutChartProps {
    categories: {
        name: string;
        weight: number;
    }[];
}

export const WeightDonutChart: FC<WeightDonutChartProps> = props => {
    const {
        categories
    } = props;

    const options: ApexOptions = {
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 5
                        },
                        value: {
                            show: false
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Category Weights',
                            color: '#000000'
                        }
                    }
                }
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (value: number) => formatScore(value)
            }
        },
        legend: {
            show: false
        },
        labels: categories.map(category => category.name),
        chart: {
            dropShadow: {
                enabled: true,
                top: -1,
                left: 3,
                blur: 3,
                opacity: 0.2
            }
        },
        stroke: {
            width: 0
        },
        dataLabels: {
            style: {
                fontSize: '16px'
            },
            dropShadow: {
                enabled: true,
                blur: 5,
                opacity: 1.0,
                left: 3
            }
        }
    };

    return (
        <Chart
            options={options}
            series={categories.map(category => category.weight)}
            type={'donut'}
            height={'350'}
        />
    );
};
