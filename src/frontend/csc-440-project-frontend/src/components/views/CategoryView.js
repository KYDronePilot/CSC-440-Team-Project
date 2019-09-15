import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MDBContainer} from 'mdbreact';
import GradeEntries from '../grade_entries/GradeEntries';
import {fetchGradeEntries} from '../../actions/gradeEntryActions';

function mapStateToProps(state) {
    return {
        category: state.category.activeCategory,
        gradeEntries: state.gradeEntry.activeGradeEntries
    };
}

class CategoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        category: PropTypes.object.isRequired,
        gradeEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
        fetchGradeEntries: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchGradeEntries(this.props.category.id);
    }

    render() {
        return (
            <MDBContainer>
                <h1>{this.props.category.name}</h1>
                <GradeEntries gradeEntries={this.props.gradeEntries}/>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {fetchGradeEntries}
)(CategoryView);