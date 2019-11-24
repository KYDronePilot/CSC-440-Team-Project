import React, {Component} from 'react';
import {HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import {GRADE_A, LetterGrade} from '../api/gradeEntry';

interface CategoryChartItem {
    name: string;
    score: number;
    grade: LetterGrade;
}

interface CategoryScoreChartProps {
    height: number;
    width: number;
    categories: CategoryChartItem[];
    containerClassName?: string;
}

/**
 * Convert a score to a color.
 * @param score - Score to convert
 * @param minD - Minimum score to get a D
 */
function scoreToColor(score: number, minD: number) {
    let percentage = ((score - minD) / (1 - minD)) * 100;
    if (percentage >= 100)
        percentage = 100;
    else if (percentage <= 0)
        percentage = 0;
    let r, g, b = 0;
    if (percentage < 50) {
        r = 255;
        g = Math.round(5.1 * percentage);
    } else {
        g = 255;
        r = Math.round(510 - 5.10 * percentage);
    }
    let h = r * 0x10000 + g * 0x100 + b;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

// const gradeColors = (grade: LetterGrade) => {
//     switch (grade) {
//         case GRADE_A:
//             return
//     }
// };

/**
 * Bar chart for visualizing scores in different categories.
 */
class CategoryScoreChart extends Component<CategoryScoreChartProps, {}> {
    render() {
        return (
            <div className={this.props.containerClassName}>
                <XYPlot height={this.props.height} width={this.props.width} xType={'ordinal'} xDistance={10}
                        yDomain={[0, 100]} className={'d-inline'}
                >
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis/>
                    <YAxis/>
                    <VerticalBarSeries
                        colorType={'literal'}
                        data={this.props.categories.map(category => ({
                            x: category.name,
                            y: category.score * 100,
                            color: scoreToColor(category.score, 0.60)
                        }))}/>
                </XYPlot>
            </div>
        );
    }
}

export default CategoryScoreChart;
