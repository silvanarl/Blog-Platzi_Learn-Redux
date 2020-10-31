import React, { Component } from "react";
import { connect } from 'react-redux'
import * as usersActions from '../../actions/usersActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Table from './Table';

class Users extends Component {
  componentDidMount() {
    if(!this.props.users.length){
      this.props.getAll();
    }
  }
  putContent = () => {
    console.log(this.props.error);
    if(this.props.error) {
      return <Fatal message={this.props.error} />
    }
    if(this.props.loading) {
      return <Spinner />
    }
    return (
      <Table />
    )
  };

  render() {
      console.log(this.props.loading);
      console.log(this.props.error);
    return (
      <div>
        <h1>Usuarios</h1>
        {this.putContent()}
      </div>
    );
  }
};

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(Users);

