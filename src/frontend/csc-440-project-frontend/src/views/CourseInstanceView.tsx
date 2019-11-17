import React, {Component} from 'react';
import {connect} from 'react-redux';
import {allInstances} from '../utils/objectification_utils';
import CategoryView from './CategoryView';
import GradeEntryForm from '../containers/GradeEntryForm';
import {CourseInstanceBreadcrumb} from '../components/layout/breadcrumbs';
import {RouteComponentProps} from 'react-router';
import {Category, Course, CourseInstance, GradeEntry} from '../api/types';
import {getCourseInstanceCategories} from '../api/category';
import {getCategoryGradeEntries, getCourseInstanceGradeEntries} from '../api/gradeEntry';
import {POINT_BASED_GRADING} from '../api/courseInstance';
import {editGradeEntry, openCreateGradeEntryForm} from '../actions/gradeEntryActions';

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
}

interface CourseInstanceViewProps extends RouteComponentProps<MatchParams>, MapStateToPropsTypes {
    // openCreateCategoryForm: (courseInstanceId: number) => void;
    openCreateGradeEntryForm: (categoryId: number) => void;
    editGradeEntry: (gradeEntry: GradeEntry, categoryId: number) => void;
}

function mapStateToProps(state: any, ownProps: CourseInstanceViewProps): MapStateToPropsTypes {
    const courseId = parseInt(ownProps.match.params.courseId);
    const courseInstance: CourseInstance = state.courseInstance.courseInstances[courseId];

    return {
        courseInstance,
        course: state.course.courses[courseInstance.course],
        categories: getCourseInstanceCategories(allInstances(state.category.categories), courseInstance.id),
        gradeEntries: getCourseInstanceGradeEntries(
            allInstances(state.gradeEntry.gradeEntries),
            allInstances(state.category.categories),
            courseInstance.id
        ),
        gradeEntriesMap: state.gradeEntry.gradeEntries
    };
}

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

    categoryView(category: Category) {
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
            openCreateGradeEntryForm={this.props.openCreateGradeEntryForm}
            editGradeEntry={(gradeEntryId: number, categoryId: number) => (
                this.props.editGradeEntry(this.props.gradeEntriesMap[gradeEntryId], categoryId)
            )}
            category={category}
            gradeEntries={getCategoryGradeEntries(this.props.gradeEntries, category.id)}
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
                <p className={'text-muted text-center'}>
                    Credit Hours: {this.props.course.credit_hours} | Section: {this.props.courseInstance.section}
                </p>
                {/*<MDBBtn color={'secondary'} onClick={this.openCreateCategoryForm}>*/}
                {/*    Add Category*/}
                {/*</MDBBtn>*/}
                {this.props.categories.map(category => this.categoryView(category))}
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
