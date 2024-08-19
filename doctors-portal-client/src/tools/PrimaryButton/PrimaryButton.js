import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary from-primary to-secondary">{children}</button>
    );
};

export default PrimaryButton;