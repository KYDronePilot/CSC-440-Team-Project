import React from 'react';
import {BreadcrumbItem} from './common';
import {GRADE_TRACKER_ROOT_URL} from '../../../routes/urls';

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
            link={GRADE_TRACKER_ROOT_URL}
            active={active}
            key={'gradeTracker'}
        >
            Grade Tracker
        </BreadcrumbItem>
    );
}
