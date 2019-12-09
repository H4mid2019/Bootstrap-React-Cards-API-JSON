import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container, Row } from "react-bootstrap";

class He extends Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };
  fetchUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <Container>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            users.map(user => {
              const { username, name, email, id } = user;
              return (
                <Row className="justify-content-md-center">
                  <div key={id}>
                    <br />
                    <Card className="text-center" style={{ width: "18rem" }}>
                      <Card.Header>{username}</Card.Header>
                      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                      <Card.Body>
                        <Card.Title>Name: {name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {email}
                        </Card.Subtitle>
                        <Card.Text>Email Address: {email}</Card.Text>
                        <Button
                          variant="primary"
                          style={{ marginRight: "20px" }}
                        >
                          Card Link
                        </Button>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        2 days ago
                      </Card.Footer>
                    </Card>
                  </div>
                </Row>
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<He />, rootElement);
