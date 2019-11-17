import React, {Component} from 'react';
import {MDBContainer} from 'mdbreact';
import GradeEntries from '../containers/GradeEntryList';
import ScoreBar from '../components/ScoreBar';
import {Category, GradeEntry} from '../api/types';
import {formatScore, gradeEntryStatistics} from '../api/gradeEntry';

interface CategoryViewProps {
    category: Category;
    gradeEntries: GradeEntry[];
    minA?: number;
    minB?: number;
    minC?: number;
    minD?: number;
    // editCategory: (categoryId: number) => void;
    editGradeEntry: (gradeEntryId: number, categoryId: number) => void;
    openCreateGradeEntryForm: (categoryId: number) => void;
}

class CategoryView extends Component<CategoryViewProps, {}> {
    // Default letter grade cutoffs
    private static defaultProps = {
        minA: 0.9,
        minB: 0.8,
        minC: 0.7,
        minD: 0.6
    };

    constructor(props: CategoryViewProps) {
        super(props);
        this.state = {};
        // this.editCategory = this.editCategory.bind(this);
    }

    // editCategory(e: SyntheticEvent) {
    //     this.props.editCategory(this.props.category.id);
    // }

    render() {
        const gradeStatistics = gradeEntryStatistics(
            this.props.gradeEntries.map(gradeEntry => ({
                points: gradeEntry.points,
                maxPoints: gradeEntry.max_points
            })),
            this.props.minA,
            this.props.minB,
            this.props.minC,
            this.props.minD
        );

        return (
            <MDBContainer className={'my-5'}>
                <h2 className={'font-weight-bold'}>
                    {this.props.category.name} {gradeStatistics !== null &&
                `- ${formatScore(gradeStatistics.score)}`
                }
                </h2>
                {gradeStatistics !== null &&
                <ScoreBar score={gradeStatistics.score} className={'mb-3'}/>
                }
                {/*<MDBBtn className={'btn-link p-0'} color={''} onClick={this.editCategory}>*/}
                {/*    Edit*/}
                {/*</MDBBtn>*/}
                <GradeEntries
                    gradeEntries={this.props.gradeEntries}
                    editGradeEntry={gradeEntryId => this.props.editGradeEntry(gradeEntryId, this.props.category.id)}
                    openCreateGradeEntryForm={() => this.props.openCreateGradeEntryForm(this.props.category.id)}
                />
            </MDBContainer>
        );
    }
}

export default CategoryView;
