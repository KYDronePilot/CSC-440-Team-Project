import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MDBContainer} from 'mdbreact';
import GradeEntries from '../containers/GradeEntryList';
import {allInstances} from '../utils/objectification_utils';
import {editCategory} from '../actions/categoryActions';
import ScoreBar from '../components/ScoreBar';

function mapStateToProps(state) {
    return {
        gradeEntries: state.gradeEntry.gradeEntries
    };
}

class CategoryView extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired,
        gradeEntries: PropTypes.object.isRequired,
        editCategory: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.editCategory = this.editCategory.bind(this);

        this.gradeEntries = this.gradeEntries.bind(this);
        this.score = this.score.bind(this);
    }

    /**
     * Get associated grade entries.
     */
    gradeEntries() {
        const gradeEntries = allInstances(this.props.gradeEntries);
        return gradeEntries.filter(gradeEntry => gradeEntry.category === this.props.category.id);
    }

    editCategory(e) {
        this.props.editCategory(this.props.category, this.props.category.course_instance);
    }

    /**
     * Get score of all grade entries.
     */
    score() {
        let max_points = 0;
        let actual_points = 0;
        for (const gradeEntry of this.gradeEntries()) {
            max_points += gradeEntry.max_points;
            actual_points += gradeEntry.points;
        }
        return actual_points / max_points;
    }

    render() {
        return (
            <MDBContainer className={'my-5'}>
                <h2 className={'font-weight-bold'}>
                    {this.props.category.name} - {(this.score() * 100).toFixed(1)}%
                </h2>
                <ScoreBar score={this.score()} className={'mb-3'}/>
                {/*<MDBBtn className={'btn-link p-0'} color={''} onClick={this.editCategory}>*/}
                {/*    Edit*/}
                {/*</MDBBtn>*/}
                <GradeEntries gradeEntries={this.gradeEntries()} category={this.props.category}/>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {editCategory}
)(CategoryView);
