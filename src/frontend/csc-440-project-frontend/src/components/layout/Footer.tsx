import React, {Component} from 'react';
import {MDBCol, MDBContainer, MDBFooter, MDBRow} from 'mdbreact';
import {Link} from 'react-router-dom';
import {CONCENTRATION_PROGRESS_URL, GRADE_TRACKER_ROOT_URL, ROOT_URL} from '../../routes/urls';


interface FooterProps {

}

const GITHUB_URL = 'https://github.com/KYDronePilot/CSC-440-Team-Project/';
const GITHUB_ISSUES_URL = `${GITHUB_URL}issues`;
const GITHUB_CONTRIBUTION_URL = GITHUB_URL;
const APACHE_2_0_URL = 'https://www.apache.org/licenses/LICENSE-2.0';

class Footer extends Component<FooterProps, {}> {
    render() {
        return (
            <MDBFooter color={'mdb-color'} className={'font-small pt-5 mt-4'}>
                <MDBContainer className={'text-center text-md-left'}>
                    <MDBRow className={'text-center text-md-left mt-3 pb-3'}>
                        <MDBCol md={'3'} lg={'2'} xl={'2'} className={'mx-auto mt-3'}>
                            <h6 className={'text-uppercase mb-4 font-weight-bold'}>
                                Source Code
                            </h6>
                            <p>
                                <a href={GITHUB_ISSUES_URL}>
                                    Report an Issue
                                </a>
                            </p>
                            <p>
                                <a href={GITHUB_CONTRIBUTION_URL}>
                                    Contribute
                                </a>
                            </p>
                        </MDBCol>
                        <hr className={'w-100 clearfix d-md-none'}/>
                        <MDBCol md={'4'} lg={'3'} xl={'3'} className={'mx-auto mt-3'}>
                            <h6 className={'text-uppercase mb-4 font-weight-bold'}>Links</h6>
                            <p>
                                <Link to={ROOT_URL}>Dashboard</Link>
                            </p>
                            <p>
                                <Link to={GRADE_TRACKER_ROOT_URL}>Grade Tracker Home</Link>
                            </p>
                            <p>
                                <Link to={CONCENTRATION_PROGRESS_URL}>Concentration Progress</Link>
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <hr/>
                    <MDBRow className={'d-flex align-items-center'}>
                        <MDBCol md={'8'} lg={'8'}>
                            <p className={'text-center text-md-left grey-text'}>
                                <a href={APACHE_2_0_URL}>
                                    <i className={'fas fa-balance-scale'}/> Apache 2.0
                                </a>
                            </p>
                        </MDBCol>
                        <MDBCol md={'4'} lg={'4'} className={'ml-lg-0'}>
                            <div className={'text-center text-md-right'}>
                                <ul className={'list-unstyled list-inline'}>
                                    <li className={'list-inline-item'}>
                                        <a
                                            className={'btn-floating btn-sm rgba-white-slight mx-1'}
                                            href={GITHUB_URL}
                                        >
                                            <i className={'fab fa-github-square'}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBFooter>
        );
    }
}

export default Footer;
