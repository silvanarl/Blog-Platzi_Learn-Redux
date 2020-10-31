import React from "react";
import { connect } from 'react-redux';
import  { Link } from 'react-router-dom';

const Table = (props) => {
  const generatorRows = () => props.users.map((user, key) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>
            <Link to={ `/publications/${key}` }>
                <div className="eye-solid3 icon"></div>
            </Link>
        </td>
      </tr>
    ));
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
          
        </tr>
      </thead>
      <tbody>{generatorRows()}</tbody>
    </table>
  );
};

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
}
export default connect(mapStateToProps)(Table);
// mapStateToProps recibe los reducers y retornamos solo el que nos interesa
// conectar con este componente, en este caso es users
// aquí entiendo que connect obtiene el valor de mapStateToProps
// y lo conecta con el componente Table y que por eso se lo ponemos al ladito

