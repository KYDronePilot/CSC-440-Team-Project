import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';

function mapStateToProps(state) {
    return {};
}

class DeleteWarning extends Component {
    static propTypes = {
        onConfirmation: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        toggleVisible: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.visible} toggle={this.props.toggleVisible} size={'md'}>
                    <MDBModalHeader toggle={this.props.toggleVisible}>
                        Are you sure you want to delete this item?
                    </MDBModalHeader>
                    <MDBModalBody>
                        {this.props.children}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn
                            color={'danger'}
                            onClick={this.props.onConfirmation}
                        >
                            Yes, Delete
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps
)(DeleteWarning);