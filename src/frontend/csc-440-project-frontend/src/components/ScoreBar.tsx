import React, {Component} from 'react';
import {MDBProgress} from 'mdbreact';
import {GRADE_A, GRADE_B, GRADE_C, GRADE_D, LetterGrade} from '../api/gradeEntry';

interface ScoreBarProps {
    score: number;
    letterGrade: LetterGrade;
    className?: string;
}

class ScoreBar extends Component<ScoreBarProps, {}> {
    private static defaultProps = {
        className: ''
    };

    constructor(props: ScoreBarProps) {
        super(props);

        this.progressFormat = this.progressFormat.bind(this);
        this.barColor = this.barColor.bind(this);
    }

    /**
     * Format decimal score to whole progress number.
     * @return Formatted progress number
     */
    private progressFormat() {
        return Math.round(this.props.score * 100);
    }

    /**
     * Get color class for score bar.
     * @return Color class for score bar
     */
    private barColor() {
        switch (this.props.letterGrade) {
            case GRADE_A:
                return 'success';
            case GRADE_B:
                return 'warning';
            case GRADE_C:
                return 'warning';
            case GRADE_D:
                return 'danger';
            default:
                return 'danger';
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <MDBProgress material value={this.progressFormat()} height={'20px'} color={this.barColor()}>
                    {this.props.children}
                </MDBProgress>
            </div>
        );
    }
}

export default ScoreBar;
