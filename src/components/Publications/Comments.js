import React from 'react';
import {connect } from 'react-redux';
import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';

const Comments = (props) => {
    if(props.comments_error){
        return <Fatal message={props.comments_error} />
    }
    if(props.comments_loading && !props.comments.length){
        return <Spinner />
    }
    
    const insertComments= () => (
        props.comments.map((comment) => (
            <li>
                <b>
                    <u>
                        {comment.email}
                    </u>
                </b>
                <br/>
                {comment.body}
            </li>
        ))
    );

    return (
        <ul>
            { insertComments() }
        </ul>
    )

};

const mapStateToProps = ({ publicReducer}) => publicReducer;

export default connect(mapStateToProps)(Comments);
