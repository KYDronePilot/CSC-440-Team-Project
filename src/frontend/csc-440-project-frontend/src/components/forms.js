import {MDBBtn, MDBPopover} from 'mdbreact';
import React from 'react';

export function DeleteButtonWithConfirmation(props) {
    return (
        <MDBPopover clickable>
            <MDBBtn color={'danger'} type={'button'}>
                Delete
            </MDBBtn>
            <div>
                <p>Are you sure?</p>
                <MDBBtn
                    color={'danger'} type={'button'}
                    size={'md'} onClick={props.handleDelete}
                >
                    Confirm
                </MDBBtn>
            </div>
        </MDBPopover>
    );
}