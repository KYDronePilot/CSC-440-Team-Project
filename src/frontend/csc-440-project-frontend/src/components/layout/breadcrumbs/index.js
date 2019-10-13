import React from 'react';
import {MDBBreadcrumb, MDBContainer} from 'mdbreact';
import HomeItem from './HomeItem';
import GradeTrackerItem from './GradeTrackerItem';
import SemesterItem from './SemesterItem';
import CourseInstanceItem from './CourseInstanceItem';

function BreadcrumbContainer(props) {
    return (
        <MDBContainer>
            <MDBBreadcrumb>
                {props.children}
            </MDBBreadcrumb>
        </MDBContainer>
    );
}

export function HomeBreadcrumb(props) {
    return (
        <BreadcrumbContainer>
            <HomeItem active={true}/>
        </BreadcrumbContainer>
    );
}

export function GradeTrackerBreadcrumb(props) {
    return (
        <BreadcrumbContainer>
            <HomeItem/>
            <GradeTrackerItem active={true}/>
        </BreadcrumbContainer>
    );
}

export function SemesterBreadcrumb(props) {
    return (
        <BreadcrumbContainer>
            <HomeItem/>
            <GradeTrackerItem/>
            <SemesterItem active={true} semesterId={props.semesterId}/>
        </BreadcrumbContainer>
    );
}

export function CourseInstanceBreadcrumb(props) {
    return (
        <BreadcrumbContainer>
            <HomeItem/>
            <GradeTrackerItem/>
            <SemesterItem active={false} semesterId={props.semesterId}/>
            <CourseInstanceItem active={true} courseInstanceId={props.courseInstanceId}/>
        </BreadcrumbContainer>
    );
}
