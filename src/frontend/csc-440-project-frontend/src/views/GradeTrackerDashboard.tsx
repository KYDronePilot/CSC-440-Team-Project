import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HomeBreadcrumb} from '../components/layout/breadcrumbs';
import {MDBContainer, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import {GRADE_TRACKER_ROOT_URL} from '../routes/urls';
import {GpaDonutChart} from '../components/DonutCharts';

interface MapStateToPropsTypes {

}

interface GradeTrackerDashboardProps extends MapStateToPropsTypes {

}

interface GradeTrackerDashboardState {

}

function mapStateToProps(state: any) {
    return {};
}

function mapDispatchToProps(dispatch: any) {
    return {};
}

class GradeTrackerDashboard extends Component<GradeTrackerDashboardProps, GradeTrackerDashboardState> {
    render() {
        return (
            <div>
                <HomeBreadcrumb/>
                <MDBContainer>
                    <h1 className={'text-center'}>Grade Tracker Dashboard</h1>
                    <MDBNav className={'nav-pills nav-fill'}>
                        <MDBNavItem>
                            <MDBNavLink to={GRADE_TRACKER_ROOT_URL} active>Grade Tracker Home</MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>

                    <GpaDonutChart name={'Semester GPA'} height={350} gpa={3.6}/>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GradeTrackerDashboard);
