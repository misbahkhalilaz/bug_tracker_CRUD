//import store from "./redux/store";
import React, { useEffect } from "react";
import Views from "./components/Views";
import Body from "./components/Body";
import { Card } from "react-bootstrap";
import InputForm from "./components/InputForm";
import { connect } from "react-redux";
import { readData } from "./redux/actionCreators";

//store.subscribe(() => console.log(store.getState()));

function App(props) {
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/read", requestOptions)
      .then((response) => response.text())
      .then((result) => props.readData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <Card id="card">
      <Card.Header>
        <InputForm />
      </Card.Header>
      <Card.Body>
        <Body />
      </Card.Body>
      <Card.Footer>
        <Views />
      </Card.Footer>
    </Card>
  );
}

export default connect(null, { readData })(App);
