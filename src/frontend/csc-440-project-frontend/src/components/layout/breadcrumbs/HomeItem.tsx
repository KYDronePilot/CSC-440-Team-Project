import React from 'react';
import {BreadcrumbItem} from './common';

interface HomeItemProps {
    active: boolean
}

/**
 * Home breadcrumb item.
 * @param active - Whether item is displayed as active
 */
export default function HomeItem({active = false}: HomeItemProps) {
    return (
        <BreadcrumbItem link={'/'} active={active}>
            Home
        </BreadcrumbItem>
    );
}