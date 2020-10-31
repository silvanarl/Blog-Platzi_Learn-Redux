import React from 'react';
//import '../../css/spinner.css';

const Fatal = (props) => {
    {console.log(props)}
    return (
        <h2>
            {props.message}
        </h2>
    );
};

export default Fatal;