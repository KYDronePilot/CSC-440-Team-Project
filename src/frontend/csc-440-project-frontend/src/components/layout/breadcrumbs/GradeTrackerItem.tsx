import React from 'react';
import {BreadcrumbItem} from './common';

interface GradeTrackerItemProps {
    active: boolean
}

/**
 * Grade tracker breadcrumb item. Links to grade tracker home.
 * @param active - Whether item is displayed as active
 */
export default function GradeTrackerItem({active = false}: GradeTrackerItemProps) {
    return (
        <BreadcrumbItem
            link={'/'}
            active={active}
            key={'gradeTracker'}
        >
            Grade Tracker
        </BreadcrumbItem>
    );
}
