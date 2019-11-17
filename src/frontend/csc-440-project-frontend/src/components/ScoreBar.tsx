import React, {Component} from 'react';
import {MDBProgress} from 'mdbreact';

interface ScoreBarProps {
    score: number;
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
        if (this.props.score >= 0.80)
            return 'success';
        if (this.props.score >= 0.70)
            return 'warning';
        return 'danger';
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
