import React, {Component} from 'react';
import {RequirementStructureNode} from '../api/types';
import RequirementTreeNode from './RequirementTreeNode';
import {MDBTreeview} from 'mdbreact';

interface RequirementTreeProps {
    rootRequirement: RequirementStructureNode;
}

interface RequirementTreeState {

}

class RequirementTree extends Component<RequirementTreeProps, RequirementTreeState> {
    constructor(props: RequirementTreeProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'bg-white mt-5'}>
                <MDBTreeview
                    theme={'animated'}
                    header={this.props.rootRequirement.name}
                    className={'font-weight-bold'}
                >
                    {this.props.rootRequirement.sub_requirements.map(requirement => (
                        <RequirementTreeNode requirementNode={requirement} key={requirement.name}/>
                    ))}
                </MDBTreeview>
            </div>
        );
    }
}

export default RequirementTree;
