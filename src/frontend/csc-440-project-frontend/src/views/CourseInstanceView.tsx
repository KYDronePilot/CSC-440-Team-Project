import React, {Component, FC} from 'react';
import {connect} from 'react-redux';
import {allInstances} from '../utils/objectification_utils';
import CategoryView from './CategoryView';
import GradeEntryForm from '../containers/GradeEntryForm';
import {CourseInstanceBreadcrumb} from '../components/layout/breadcrumbs';
import {RouteComponentProps} from 'react-router';
import {Category, Course, CourseInstance, GradeEntry} from '../api/types';
import {getCourseInstanceCategories} from '../api/category';
import {formatScore, getCategoryGradeEntries, getCourseInstanceGradeEntries, LetterGrade} from '../api/gradeEntry';
import {
    CourseInstanceStats,
    getCourseInstanceStats,
    generateRawCourseInstanceStructure,
    POINT_BASED_GRADING
} from '../api/courseInstance';
import {editGradeEntry, openCreateGradeEntryForm} from '../actions/gradeEntryActions';
import CategoryScoreChart from '../components/CategoryScoreChart';
import PercentDonutChart from '../components/PercentDonutChart';
import {MDBCol, MDBRow} from 'mdbreact';
import {WeightDonutChart} from '../components/WeightDonutChart';

interface MatchParams {
    courseId: string;
}

interface MapStateToPropsTypes {
    courseInstance: CourseInstance;
    course: Course;
    categories: Category[];
    gradeEntries: GradeEntry[];
    // TODO: This is a big hack and should be handled in another way
    gradeEntriesMap: { [key: number]: GradeEntry };
    courseInstanceStats: CourseInstanceStats;
}

interface CourseInstanceViewProps extends RouteComponentProps<MatchParams>, MapStateToPropsTypes {
    // openCreateCategoryForm: (courseInstanceId: number) => void;
    openCreateGradeEntryForm: (categoryId: number) => void;
    editGradeEntry: (gradeEntry: GradeEntry, categoryId: number) => void;
}

function mapStateToProps(state: any, ownProps: CourseInstanceViewProps): MapStateToPropsTypes {
    const courseId = parseInt(ownProps.match.params.courseId);
    const courseInstance: CourseInstance = state.courseInstance.courseInstances[courseId];
    const categories = getCourseInstanceCategories(allInstances(state.category.categories), courseInstance.id);
    const gradeEntries = getCourseInstanceGradeEntries(
        allInstances(state.gradeEntry.gradeEntries),
        allInstances(state.category.categories),
        courseInstance.id
    );

    return {
        courseInstance,
        course: state.course.courses[courseInstance.course],
        categories,
        gradeEntries,
        gradeEntriesMap: state.gradeEntry.gradeEntries,
        courseInstanceStats: getCourseInstanceStats(generateRawCourseInstanceStructure(
            courseInstance,
            categories,
            gradeEntries
        ))
    };
}

interface ChartsHeaderProps {
    courseScore: number;
    courseLetterGrade: LetterGrade;
    categories: {
        name: string;
        score: number;
        grade: LetterGrade;
        weight: number;
    }[];
}

/**
 * Course stats charts at beginning of view.
 */
const ChartsHeader: FC<ChartsHeaderProps> = props => {
    const {
        courseScore,
        courseLetterGrade,
        categories
    } = props;
    return (
        <MDBRow>
            <MDBCol lg={'4'}>
                <PercentDonutChart
                    score={courseScore}
                    name={'Course Total'}
                    letterGrade={courseLetterGrade}
                    height={350}
                />
            </MDBCol>
            <MDBCol lg={'4'}>
                <CategoryScoreChart
                    height={350}
                    categories={categories.map(category => ({
                        name: category.name,
                        score: category.score,
                        grade: category.grade
                    }))}
                />
            </MDBCol>
            <MDBCol lg={'4'}>
                <WeightDonutChart
                    categories={categories.map(category => ({
                        name: category.name,
                        weight: category.weight
                    }))}
                />
            </MDBCol>
        </MDBRow>
    );
};

class CourseInstanceView extends Component<CourseInstanceViewProps, {}> {
    constructor(props: CourseInstanceViewProps) {
        super(props);
        this.state = {};

        // this.openCreateCategoryForm = this.openCreateCategoryForm.bind(this);
        this.categoryView = this.categoryView.bind(this);
    }

    /**
     * Open form for creating new category.
     */
    // openCreateCategoryForm(e: SyntheticEvent) {
    //     e.preventDefault();
    //     this.props.openCreateCategoryForm(this.props.courseInstance.id);
    // }

    categoryView(category: Category, i: number) {
        let gradeCutoffs;
        if (this.props.courseInstance.grading_strategy === POINT_BASED_GRADING)
            gradeCutoffs = {};
        else {
            gradeCutoffs = {
                minA: this.props.courseInstance.min_a,
                minB: this.props.courseInstance.min_b,
                minC: this.props.courseInstance.min_c,
                minD: this.props.courseInstance.min_d
            }
        }

        return <CategoryView
            key={category.id}
            openCreateGradeEntryForm={this.props.openCreateGradeEntryForm}
            editGradeEntry={(gradeEntryId: number, categoryId: number) => (
                this.props.editGradeEntry(this.props.gradeEntriesMap[gradeEntryId], categoryId)
            )}
            category={category}
            gradeEntries={getCategoryGradeEntries(this.props.gradeEntries, category.id)}
            categoryStats={this.props.courseInstanceStats.categoryStats[i]}
            {...gradeCutoffs}
        />
    }

    render() {
        return (
            <div>
                <GradeEntryForm/>
                {/*<CategoryForm/>*/}
                <CourseInstanceBreadcrumb
                    semesterId={this.props.courseInstance.semester}
                    courseInstanceId={this.props.courseInstance.id}
                />
                <h1 className={'text-center'}>{this.props.course.code}: {this.props.course.name}</h1>
                <p className={'text-center'}>
                    Credit Hours: {this.props.course.credit_hours}
                    &nbsp;| Section: {this.props.courseInstance.section}
                    &nbsp;| Grade: {this.props.courseInstanceStats.letterGrade}
                    &nbsp;({formatScore(this.props.courseInstanceStats.score)})
                </p>
                <ChartsHeader
                    courseLetterGrade={this.props.courseInstanceStats.letterGrade}
                    courseScore={this.props.courseInstanceStats.score}
                    categories={this.props.courseInstanceStats.categoryStats.map((category, i) => ({
                        name: this.props.categories[i].name,
                        score: category.score,
                        grade: category.letterGrade,
                        weight: category.weight
                    }))}
                />
                {/*<MDBBtn color={'secondary'} onClick={this.openCreateCategoryForm}>*/}
                {/*    Add Category*/}
                {/*</MDBBtn>*/}
                {this.props.categories.map((category, i) => this.categoryView(category, i))}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        // openCreateCategoryForm,
        openCreateGradeEntryForm,
        editGradeEntry
    }
)(CourseInstanceView);
