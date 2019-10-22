import {MDBBreadcrumbItem} from 'mdbreact';
import React, {FC, ReactNode} from 'react';
import {Link} from 'react-router-dom';

interface LinkOrTextProps {
    active?: boolean;
    children?: ReactNode;
    link: string;
}

/**
 * Get link to page if not active, else, just get the text.
 */
const LinkOrText: FC<LinkOrTextProps> = ({active = false, children, link}) => {
    if (active === true)
        return <>{children}</>;

    return (
        <Link to={link}>
            {children}
        </Link>
    );
};

type MDBBreadcrumbItemType = typeof MDBBreadcrumbItem;

interface BreadcrumbItemProps extends Partial<MDBBreadcrumbItemType> {
    link: string,
    active?: boolean,
    children?: ReactNode,
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({link, children, active = false, ...rest}) => {
    return (
        <MDBBreadcrumbItem active={active} {...rest}>
            <LinkOrText active={active} link={link}>
                {children}
            </LinkOrText>
        </MDBBreadcrumbItem>
    );
};