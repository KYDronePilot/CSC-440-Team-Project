import React, {FC, FormEvent} from 'react';
import {MDBBtn} from 'mdbreact';

interface GradeTrackerButtonProps {
    onClick: (e: FormEvent<HTMLButtonElement>) => void;
    className?: string;
    children: any;
}

export const GradeTrackerButton: FC<GradeTrackerButtonProps> = props => {
    const {
        onClick,
        className,
        children
    } = props;

    let realClassName = `winter-neva-gradient text-dark font-weight-bold ${className}`;

    return (
        <MDBBtn
            onClick={onClick}
            className={realClassName}
            style={{fontSize: '16px'}}
        >
            {children}
        </MDBBtn>
    );
};
