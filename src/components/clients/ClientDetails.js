import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
  state = {};

  // Delete Client
  onDeleteClick = e => {
    const { firestore, client, history } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                {" "}
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">{client.gamertag}</h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">Email: {client.email}</li>
                <li className="list-group-item">Password: {client.password}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
