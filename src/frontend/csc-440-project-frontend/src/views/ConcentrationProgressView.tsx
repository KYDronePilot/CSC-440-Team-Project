import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MDBBtn, MDBContainer} from 'mdbreact';
import AsyncSelect from 'react-select/async';
import {CollegeOption, loadColleges} from '../api/college';
import {College, RequirementStructureNode} from '../api/types';
import {ValueType} from 'react-select/src/types';
import {loadMajors, MajorOption, MajorOptions} from '../api/major';
import {ConcentrationOption, ConcentrationOptions, loadConcentrations} from '../api/concentration';
import RequirementTree from '../components/RequirementTree';
import {loadRequirementStructure} from '../api/requirement';
import {GradeTrackerButton} from '../components/Common';

function mapStateToProps(state: any) {
    return {};
}

interface ConcentrationProgressViewProps {

}

interface ConcentrationProgressViewState {
    college: College | null;
    majorOption: ValueType<MajorOption>;
    defaultMajorOptions: MajorOptions;
    concentrationOption: ValueType<ConcentrationOption>;
    defaultConcentrationOptions: ConcentrationOptions;
    requirementStructure: RequirementStructureNode | null;
}


class ConcentrationProgressView extends Component<ConcentrationProgressViewProps, ConcentrationProgressViewState> {
    constructor(props: ConcentrationProgressViewProps) {
        super(props);
        this.state = {
            college: null,
            majorOption: null,
            defaultMajorOptions: [],
            concentrationOption: null,
            defaultConcentrationOptions: [],
            requirementStructure: null
        };

        this.onCollegeSelectChange = this.onCollegeSelectChange.bind(this);
        this.loadCollegeMajors = this.loadCollegeMajors.bind(this);
        this.onMajorSelectChange = this.onMajorSelectChange.bind(this);
        this.onConcentrationSelectChange = this.onConcentrationSelectChange.bind(this);
        this.loadMajorConcentrations = this.loadMajorConcentrations.bind(this);
        this.areOptionsSet = this.areOptionsSet.bind(this);
        this.loadRequirementStructure = this.loadRequirementStructure.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<ConcentrationProgressViewProps>, prevState: Readonly<ConcentrationProgressViewState>, snapshot?: any): void {
    }

    public render() {
        return (
            <MDBContainer>
                <h1 className={'font-weight-bold my-4'}>Concentration Progress Tracker</h1>
                <AsyncSelect
                    cacheOptions
                    isClearable
                    defaultOptions
                    placeholder={'Select College...'}
                    loadOptions={loadColleges}
                    onChange={this.onCollegeSelectChange}
                    className={'my-2'}
                />
                <div className={'pl-4'}>
                    <hr/>
                    <AsyncSelect
                        isClearable
                        placeholder={'Select Major...'}
                        value={this.state.majorOption}
                        defaultOptions={this.state.defaultMajorOptions}
                        isDisabled={this.state.college === null}
                        loadOptions={this.loadCollegeMajors()}
                        onChange={this.onMajorSelectChange}
                        className={'my-2'}
                    />
                    <div className={'pl-4'}>
                        <hr/>
                        <AsyncSelect
                            isClearable
                            placeholder={'Select Concentration...'}
                            value={this.state.concentrationOption}
                            defaultOptions={this.state.defaultConcentrationOptions}
                            isDisabled={this.state.majorOption === null}
                            loadOptions={this.loadMajorConcentrations()}
                            onChange={this.onConcentrationSelectChange}
                            className={'my-2'}
                        />
                    </div>
                </div>
                <div className={'text-right'}>
                    <GradeTrackerButton onClick={this.loadRequirementStructure} className={'mr-0'}>
                        Load Progress
                    </GradeTrackerButton>
                </div>
                {this.state.requirementStructure !== null &&
                <RequirementTree rootRequirement={this.state.requirementStructure}/>
                }
            </MDBContainer>
        );
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

    /**
     * Unwrapper for loading concentrations for the current major.
     */
    private loadMajorConcentrations() {
        if (this.state.majorOption === null
            || this.state.majorOption === undefined
            || Array.isArray(this.state.majorOption)
        )
            return loadConcentrations({major_id: null});
        return loadConcentrations({major_id: this.state.majorOption.value.id});
    }

    /**
     * Handle change to college option.
     * @param option - Selected option
     */
    private onCollegeSelectChange(option: ValueType<CollegeOption>) {
        if (option === null || option === undefined) {
            this.setState({
                college: null,
                defaultMajorOptions: [],
                majorOption: null,
                defaultConcentrationOptions: [],
                concentrationOption: null,
                requirementStructure: null
            });
        } else if (!Array.isArray(option)) {
            this.setState({college: option.value}, () => {
                this.loadCollegeMajors()('', options => {
                    this.setState({
                        majorOption: null,
                        defaultMajorOptions: options
                    });
                });
            });
        }
    }

    /**
     * Handle change to major option.
     * @param option - Selected option
     */
    private onMajorSelectChange(option: ValueType<MajorOption>) {
        if (option === null || option === undefined) {
            this.setState({
                majorOption: null,
                defaultConcentrationOptions: [],
                concentrationOption: null,
                requirementStructure: null
            });
        }
        else if (!Array.isArray(option)) {
            this.setState({majorOption: option}, () => {
                this.loadMajorConcentrations()('', options => {
                    this.setState({
                        concentrationOption: null,
                        defaultConcentrationOptions: options
                    })
                })
            });
        }
    }

    /**
     * Handle change to concentration option.
     * @param option - Selected option
     */
    private onConcentrationSelectChange(option: ValueType<ConcentrationOption>) {
        this.setState({
            concentrationOption: option,
            requirementStructure: null
        });
    }

    /**
     * Check if concentration options are set.
     * @return If all concentration options are set
     */
    private areOptionsSet() {
        return (
            this.state.college !== null
            && this.state.majorOption !== null
            && this.state.concentrationOption !== null
        );
    }

    /**
     * Load requirement structure for the concentration.
     */
    private loadRequirementStructure() {
        const concentrationOption = this.state.concentrationOption;
        if (concentrationOption !== null
            && concentrationOption !== undefined
            && !Array.isArray(concentrationOption)
        )
        loadRequirementStructure(concentrationOption.value.id)
            .then(res => {
                if (res !== undefined)
                    this.setState({requirementStructure: res})
            });
    }
}

export default connect(
    mapStateToProps
)(ConcentrationProgressView);
