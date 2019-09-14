import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGradeEntries} from '../../../actions/gradeEntryActions';
import { MDBListGroup, MDBContainer } from 'mdbreact';
import GradeEntry from './GradeEntry';

function mapStateToProps(state) {
    return {
        gradeEntries: state.gradeEntries.items
    };
}

class GradeEntries extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.props.fetchGradeEntries();
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBListGroup>
                        {this.props.gradeEntries.map(item => <GradeEntry gradeEntry={item}/>)}
                    </MDBListGroup>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {fetchGradeEntries}
)(GradeEntries);