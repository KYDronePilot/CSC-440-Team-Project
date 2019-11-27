import React, {Component} from 'react';
import {MDBProgress} from 'mdbreact';
import {getLetterGradeColorClass, GRADE_A, GRADE_B, GRADE_C, GRADE_D, LetterGrade} from '../api/gradeEntry';

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
    }

    /**
     * Format decimal score to whole progress number.
     * @return Formatted progress number
     */
    private progressFormat() {
        return Math.round(this.props.score * 100);
    }

    render() {
        return (
            <div className={this.props.className}>
                <MDBProgress
                    material
                    value={this.progressFormat()}
                    height={'20px'}
                    color={getLetterGradeColorClass(this.props.letterGrade)}
                >
                    {this.props.children}
                </MDBProgress>
            </div>
        );
    }
}

export default ScoreBar;
