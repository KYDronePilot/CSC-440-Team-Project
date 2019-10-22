import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MDBBtn, MDBContainer} from 'mdbreact';
import GradeEntries from '../containers/GradeEntryList';
import {allInstances} from '../utils/objectification_utils';
import {editCategory} from '../actions/categoryActions';

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

    render() {
        return (
            <MDBContainer>
                <h1>{this.props.category.name}</h1>
                <MDBBtn className={'btn-link p-0'} color={''} onClick={this.editCategory}>
                    Edit
                </MDBBtn>
                <GradeEntries gradeEntries={this.gradeEntries()} category={this.props.category}/>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {editCategory}
)(CategoryView);