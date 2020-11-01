import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Comments from './Comments';

import * as usersActions from '../../actions/usersActions';
import * as publicActions from '../../actions/publicActions';

const { getAll: usersGetAll } = usersActions;
const { getByUser: publicGetByUser, openClose, getComments } = publicActions;

class Publications extends Component {
    async componentDidMount() {
        const {
            usersGetAll,
            publicGetByUser,
            match: { params : { key }}
        } = this.props;

        if(!this.props.usersReducer.users.length){ //especificar de que reducer traemos los datos
            await usersGetAll();
        }
        if(this.props.usersReducer.error){
            return ;
        }
        if(!('postsKey' in this.props.usersReducer.users[key])){
            publicGetByUser(key);
        }
    }

    putUser = () => {
        console.log(this.props);
        const { 
            usersReducer,
            match: { params: { key } }
        } = this.props;
        if(usersReducer.error){
            <Fatal message={usersReducer.error} />
        }
        if(!usersReducer.users.length || usersReducer.loading){
            <Spinner />
        }
        const name = usersReducer.users[key].name;
        return (
            <h1>Publicaciones de {name} </h1>
        )
    };

    putPosts = () => {
        const { 
            usersReducer,
            usersReducer: { users },
            publicReducer,
            publicReducer: { posts },
            match: { params : { key }}
        } = this.props;

        if(!users.length) return ;
        if(usersReducer.error) return;
        if(publicReducer.loading){
            return <Spinner />
        }
        if(publicReducer.error){
            return <Fatal message={publicReducer.error} />
        }
        if(!posts.length) return;
        if(!('postsKey' in users[key])) return;

        const { postsKey } = users[key];

        return this.showInfo(
            posts[postsKey], 
            postsKey
        )
    }

    showInfo = (posts, postsKey) => (
        posts.map((post, commentKey) => (
            <div 
                key={post.id}
                className="post-title"
                onClick={
                    () => this.showComments(postsKey, commentKey, post.comments)
                }
            >
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                {
                    (post.open) ? <Comments comments={post.comments} /> : ''
                }
            </div>
        ))
    );

    showComments = (postsKey, commentKey, comments) => {
        this.props.openClose(postsKey, commentKey);
        if(!comments.length){
            this.props.getComments(postsKey, commentKey);
        }
    };
    
    render(){
        {console.log(this.props)}
        return (
            <div> 
                {this.putUser() }
                {this.putPosts()}
            </div>
        )
    }
};

const mapStateToProps = ({ usersReducer, publicReducer }) => {
    return {
        usersReducer,
        publicReducer
    }
};

const mapDispatchToProps = {
    usersGetAll,
    publicGetByUser,
    openClose,
    getComments,
}
export default connect(mapStateToProps, mapDispatchToProps)(Publications);


/*Para obtener este key: <div>{this.props.match.params.key}</div>, 
hay que mandar el componente como prop desde App: component={Publications}
así con this accede a las propiedades del componente*/