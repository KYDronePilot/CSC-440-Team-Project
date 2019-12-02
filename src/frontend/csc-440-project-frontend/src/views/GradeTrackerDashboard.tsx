import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HomeBreadcrumb} from '../components/layout/breadcrumbs';
import {MDBContainer, MDBListGroup, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import {GRADE_TRACKER_ROOT_URL} from '../routes/urls';
import {GpaDonutChart} from '../components/DonutCharts';
import {allInstances, indexInstances} from '../utils/objectification_utils';
import {Category, Course, CourseInstance, GradeEntry, Semester} from '../api/types';
import {
    CourseInstanceStats,
    generateRawGradeTrackerInfoStructure,
    generateRawSemesterStructure,
    getOverallStats,
    getSemesterCourseInstances,
    getSemesterStats,
    SemesterStats
} from '../api/courseInstance';
import {formatYearSeason, getCurrentSchoolSeason, getCurrentYear, searchSemesters} from '../api/semester';
import {Season} from '../components/SemesterListItem';
import ScoreChart from '../components/ScoreChart';
import CourseInstanceListItem from '../components/CourseInstanceListItem';

interface MapStateToPropsTypes {
    overallGpa: number;
    year: number;
    season: Season;
    currentSemesterInfo?: {
        semester: Semester;
        stats: SemesterStats;
        courses: {
            course: Course;
            courseInstance: CourseInstance;
            stats: CourseInstanceStats;
        }[];
    };
}

interface GradeTrackerDashboardProps extends MapStateToPropsTypes {

}

interface GradeTrackerDashboardState {

}

function mapStateToProps(state: any): MapStateToPropsTypes {
    // IDs of the semesters that the user is enrolled in
    const userSemesterIDs: number[] = state.auth.user.semesters;
    // Get semesters that the user is enrolled in
    const semesters = indexInstances(state.semester.semesters, userSemesterIDs);
    // TODO: Shrinking scope of categories and grade entries could give a speed improvement
    const courseInstances: CourseInstance[] = allInstances(state.courseInstance.courseInstances);
    const coursesObject: Course[] = state.course.courses;
    const categories: Category[] = allInstances(state.category.categories);
    const gradeEntries: GradeEntry[] = allInstances(state.gradeEntry.gradeEntries);
    const gradeTrackerStats = getOverallStats(generateRawGradeTrackerInfoStructure(
        semesters,
        courseInstances,
        categories,
        gradeEntries
    ));
    // Get details for current semesters
    const [season, year] = [getCurrentSchoolSeason(), getCurrentYear()];
    const currentSemester = searchSemesters(season, year, semesters);

    // Get details about current semester if student is enrolled
    let currentSemesterInfo;
    if (currentSemester !== null) {
        const semesterCourseInstances = getSemesterCourseInstances(courseInstances, currentSemester.id);
        const currentSemesterStats = getSemesterStats(generateRawSemesterStructure(
            currentSemester,
            courseInstances,
            categories,
            gradeEntries
        ));

        currentSemesterInfo = {
            semester: currentSemester,
            stats: currentSemesterStats,
            courses: semesterCourseInstances.map((courseInstance, i) => ({
                course: coursesObject[courseInstance.course],
                courseInstance,
                stats: currentSemesterStats.courseInstanceStats[i]
            }))
        };
    } else {
        currentSemesterInfo = undefined;
    }

    return {
        overallGpa: gradeTrackerStats.gpa,
        year,
        season,
        currentSemesterInfo
    };
}

function mapDispatchToProps(dispatch: any) {
    return {};
}

class GradeTrackerDashboard extends Component<GradeTrackerDashboardProps, GradeTrackerDashboardState> {
    constructor(props: GradeTrackerDashboardProps) {
        super(props);
        this.currentSemesterInfo = this.currentSemesterInfo.bind(this);
    }

    /**
     * Info about the current semester (only if user is enrolled)
     */
    currentSemesterInfo() {
        const props = this.props;
        if (props.currentSemesterInfo === undefined)
            return (
                <p>No info for this semester</p>
            );

        const chartItems = props.currentSemesterInfo.courses.map(({course, stats}) => ({
            name: course.name,
            score: stats.score,
            grade: stats.letterGrade
        }));

        return (
            <div>
                <h3 className={'font-weight-bold'}>Course Score Distribution</h3>
                <MDBContainer className={'pr-5'} style={{maxWidth: '600px'}}>
                    <ScoreChart height={350} chartItems={chartItems}/>
                </MDBContainer>
                <h3 className={'font-weight-bold'}>Courses</h3>
                <MDBListGroup>
                    {props.currentSemesterInfo.courses.map(({course, courseInstance, stats}) => (
                        <CourseInstanceListItem
                            name={course.name}
                            code={course.code}
                            courseInstanceId={courseInstance.id}
                            lastUpdated={courseInstance.last_updated}
                            letterGrade={stats.letterGrade}
                            score={stats.score}
                            points={stats.points}
                            maxPoints={stats.maxPoints}
                        />
                    ))}
                </MDBListGroup>
            </div>
        );
    }

    render() {
        const props = this.props;

        return (
            <div>
                <HomeBreadcrumb/>
                <MDBContainer>
                    <h1 className={'text-center font-weight-bold'}>Dashboard</h1>
                    <MDBNav className={'nav-pills nav-fill'}>
                        <MDBNavItem>
                            <MDBNavLink to={GRADE_TRACKER_ROOT_URL} active>Grade Tracker Home</MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <GpaDonutChart name={'Overall GPA'} height={350} gpa={props.overallGpa}/>

                    <h2 className={'text-center font-weight-bold'}>
                        Current Semester: {formatYearSeason(this.props.season, this.props.year)}
                    </h2>
                    <div>
                        {this.currentSemesterInfo()}
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GradeTrackerDashboard);
