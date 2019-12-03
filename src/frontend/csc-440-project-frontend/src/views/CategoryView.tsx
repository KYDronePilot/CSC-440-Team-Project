import React, {Component} from 'react';
import {MDBContainer} from 'mdbreact';
import GradeEntries from '../containers/GradeEntryList';
import ScoreBar from '../components/ScoreBar';
import {Category, GradeEntry} from '../api/types';
import {formatScore} from '../api/gradeEntry';
import {CategoryStats} from '../api/courseInstance';
import {GradeTrackerButton} from '../components/Common';

interface CategoryViewProps {
    category: Category;
    gradeEntries: GradeEntry[];
    // editCategory: (categoryId: number) => void;
    editGradeEntry: (gradeEntryId: number, categoryId: number) => void;
    openCreateGradeEntryForm: (categoryId: number) => void;
    categoryStats: CategoryStats;
}

class CategoryView extends Component<CategoryViewProps, {}> {
    constructor(props: CategoryViewProps) {
        super(props);
        this.state = {};
        // this.editCategory = this.editCategory.bind(this);
        this.noGradeEntries = this.noGradeEntries.bind(this);
        this.emptyCategory = this.emptyCategory.bind(this);
        this.categoryDetails = this.categoryDetails.bind(this);
    }

    /**
     * What to show for a category that doesn't have any grade entries.
     */
    emptyCategory() {
        return (
            <>
                <h2 className={'font-weight-bold'}>
                    {this.props.category.name}
                </h2>
                <p>No grade entries for this category</p>
                <GradeTrackerButton
                    onClick={() => this.props.openCreateGradeEntryForm(this.props.category.id)}
                    className={'mr-0'}>
                    Add Grade Entry
                </GradeTrackerButton>
            </>
        );
    }

    // editCategory(e: SyntheticEvent) {
    //     this.props.editCategory(this.props.category.id);
    // }

    /**
     * What to show for a category with grade entries.
     */
    categoryDetails() {
        const stats = this.props.categoryStats;

        return (
            <>
                <h2 className={'font-weight-bold'}>
                    {this.props.category.name}
                </h2>
                <p>
                    Grade: {stats.letterGrade} | {stats.points} / {stats.maxPoints} = {formatScore(stats.score)}
                </p>
                <ScoreBar score={stats.score} className={'mb-3'} letterGrade={stats.letterGrade}/>
                {/*<MDBBtn className={'btn-link p-0'} color={''} onClick={this.editCategory}>*/}
                {/*    Edit*/}
                {/*</MDBBtn>*/}
                <GradeEntries
                    gradeEntries={this.props.gradeEntries}
                    editGradeEntry={gradeEntryId => this.props.editGradeEntry(gradeEntryId, this.props.category.id)}
                    openCreateGradeEntryForm={() => this.props.openCreateGradeEntryForm(this.props.category.id)}
                    gradeEntryStats={stats.gradeEntryStats}
                />
            </>
        );
    }

    render() {
        // Handle if there are no grade entries
        let category;
        if (this.noGradeEntries())
            category = this.emptyCategory();
        else
            category = this.categoryDetails();

        return (
            <MDBContainer className={'my-4'}>
                {category}
            </MDBContainer>
        );
    }

    /**
     * Check if there are no grade entries.
     */
    private noGradeEntries() {
        return this.props.gradeEntries.length === 0;
    }
}

export default CategoryView;
