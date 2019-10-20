import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MDBContainer} from 'mdbreact';
import AsyncSelect from 'react-select/async';
import {CollegeOption, loadColleges} from '../api/college';
import {College, Major} from '../api/types';
import {ValueType} from 'react-select/src/types';
import {loadMajors, MajorOption} from '../api/major';

function mapStateToProps(state: any) {
    return {};
}

interface ConcentrationProgressViewProps {

}

interface ConcentrationProgressViewState {
    college: College | null;
    major: Major | null;
}


class ConcentrationProgressView extends Component<ConcentrationProgressViewProps, ConcentrationProgressViewState> {
    constructor(props: ConcentrationProgressViewProps) {
        super(props);
        this.state = {
            college: null,
            major: null
        };

        this.onCollegeSelectChange = this.onCollegeSelectChange.bind(this);
        this.loadCollegeMajors = this.loadCollegeMajors.bind(this);
        this.onMajorSelectChange = this.onMajorSelectChange.bind(this);
    }

    /**
     * Unwrapper for load majors.
     *  - Filters by college
     */
    private loadCollegeMajors() {
        if (this.state.college === null)
            return loadMajors({college_id: null});
        return loadMajors({college_id: this.state.college.id});
    }

    componentDidUpdate(prevProps: Readonly<ConcentrationProgressViewProps>, prevState: Readonly<ConcentrationProgressViewState>, snapshot?: any): void {
    }

    public render() {
        return (
            <MDBContainer>
                <AsyncSelect
                    cacheOptions
                    isClearable
                    defaultOptions
                    loadOptions={loadColleges}
                    onChange={this.onCollegeSelectChange}
                />
                <AsyncSelect
                    optionsCache
                    isClearable
                    isDisabled={this.state.college === null}
                    loadOptions={this.loadCollegeMajors()}
                    onChange={this.onMajorSelectChange}
                />
            </MDBContainer>
        );
    }

    /**
     * Handle change to college option.
     * @param option - Selected option
     */
    private onCollegeSelectChange(option: ValueType<CollegeOption>) {
        if (option === null || option === undefined)
            this.setState({college: null});
        else if (!Array.isArray(option))
            this.setState({college: option.value});
    }

    /**
     * Handle change to major option.
     * @param option - Selected option
     */
    private onMajorSelectChange(option: ValueType<MajorOption>) {
        if (option === null || option === undefined)
            this.setState({major: null});
        else if (!Array.isArray(option))
            this.setState({major: option.value});
    }
}

export default connect(
    mapStateToProps
)(ConcentrationProgressView);