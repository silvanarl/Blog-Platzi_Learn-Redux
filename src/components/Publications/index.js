import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import * as publicActions from '../../actions/publicActions';

const { getAll: usersGetAll } = usersActions;
const { getByUser: publicGetByUser } = publicActions;

class Publications extends Component {
    async componentDidMount() {
        if(!this.props.usersReducer.users.lenght){ //especificar de que reducer traemos los datos
            await this.props.usersGetAll();
        }
        this.props.publicGetByUser(this.props.match.params.key);
    }

    render(){
        {console.log(this.props)}
        return (
            <div>
                <h1>Publicaciones de: </h1>
                {this.props.match.params.key}
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
}
export default connect(mapStateToProps, mapDispatchToProps)(Publications);


/*Para obtener este key: <div>{this.props.match.params.key}</div>, 
hay que mandar el componente como prop desde App: component={Publications}
así con this accede a las propiedades del componente*/