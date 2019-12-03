import React from 'react';
import {BreadcrumbItem} from './common';
import {ROOT_URL} from '../../../routes/urls';

interface HomeItemProps {
    active: boolean
}

/**
 * Home breadcrumb item.
 * @param active - Whether item is displayed as active
 */
export default function HomeItem({active = false}: HomeItemProps) {
    return (
        <BreadcrumbItem link={ROOT_URL} active={active}>
            Home
        </BreadcrumbItem>
    );
}
