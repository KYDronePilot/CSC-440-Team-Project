import React, {Component} from 'react';
import {FlexibleWidthXYPlot, HorizontalGridLines, VerticalBarSeries, VerticalGridLines, XAxis, YAxis} from 'react-vis';
import {getLetterGradeColor, LetterGrade} from '../api/gradeEntry';

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
 * Bar chart for visualizing scores in different categories.
 * TODO: Add the ability to graph scores above 100
 */
class CategoryScoreChart extends Component<CategoryScoreChartProps, {}> {
    render() {
        return (
            <div className={this.props.containerClassName}>
                <FlexibleWidthXYPlot
                    height={380}
                    xType={'ordinal'}
                    yDomain={[0, 100]}
                    className={'d-inline'}
                    margin={{bottom: 140, right: 30, left: 75}}
                >
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis tickLabelAngle={-45} style={{fontSize: '10pt'}}/>
                    <YAxis/>
                    <VerticalBarSeries
                        colorType={'literal'}
                        data={this.props.categories.map(category => ({
                            x: category.name,
                            y: category.score * 100,
                            color: getLetterGradeColor(category.grade)
                        }))}/>
                </FlexibleWidthXYPlot>
            </div>
        );
    }
}

export default CategoryScoreChart;
