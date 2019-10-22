import React, {Component} from 'react';
import {RequirementStructureNode} from '../api/types';
import RequirementTreeCourseItem from './RequirementTreeCourseItem';
import {MDBTreeviewList} from 'mdbreact';

interface RequirementTreeNodeProps {
    requirementNode: RequirementStructureNode;
}

interface RequirementTreeNodeState {

}

class RequirementTreeNode extends Component<RequirementTreeNodeProps, RequirementTreeNodeState> {
    constructor(props: RequirementTreeNodeProps) {
        super(props);
        this.state = {};

        this.subRequirementComponents = this.subRequirementComponents.bind(this);
        this.courseComponents = this.courseComponents.bind(this);
        this.icon = this.icon.bind(this);
    }

    render() {
        return (
            <MDBTreeviewList
                title={this.props.requirementNode.name}
                className={this.props.requirementNode.fulfilled ? 'green-text' : ''}
                {...this.icon()}
            >
                {this.courseComponents()}
                {this.subRequirementComponents()}
            </MDBTreeviewList>
        );
    }

    /**
     * Generate sub-requirement components for requirement.
     * @return Sub-requirement components
     */
    private subRequirementComponents() {
        return this.props.requirementNode.sub_requirements.map(requirement => (
            <RequirementTreeNode requirementNode={requirement} key={requirement.name}/>
        ));
    }

    /**
     * Generate components for courses in requirement.
     * @return Course components
     */
    private courseComponents() {
        return this.props.requirementNode.courses.map(course => (
            <RequirementTreeCourseItem name={course.name} completed={course.fulfilled} key={course.name}/>
        ));
    }

    /**
     * Get icon props for tree node.
     */
    private icon() {
        if (this.props.requirementNode.fulfilled)
            return {icon: 'check-square'};
        return {icon: 'square', far: true};
    }
}

export default RequirementTreeNode;