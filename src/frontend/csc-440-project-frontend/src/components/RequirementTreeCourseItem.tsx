import React, {Component} from 'react';
import {MDBTreeviewItem} from 'mdbreact';

interface RequirementTreeCourseItemProps {
    name: string;
    completed: boolean;
}

interface RequirementTreeCourseItemState {

}

class RequirementTreeCourseItem extends Component<RequirementTreeCourseItemProps, RequirementTreeCourseItemState> {
    constructor(props: RequirementTreeCourseItemProps) {
        super(props);
        this.state = {};

        this.icon = this.icon.bind(this);
    }

    render() {
        return (
            <MDBTreeviewItem
                {...this.icon()}
                title={this.props.name}
                className={this.props.completed ? 'green-text' : ''}
            />
        );
    }

    /**
     * Get icon props for course item.
     */
    private icon() {
        if (this.props.completed)
            return {icon: 'check-square'};
        return {icon: 'square', far: true};
    }
}

export default RequirementTreeCourseItem;