import React from 'react';

const Fatal = (props) => {
    {console.log(props)}
    return (
        <h2>
            {props.message}
        </h2>
    );
};

export default Fatal;