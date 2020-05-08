import React from "react";
import PullRequests from "./component/PullRequests";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Container>
        <PullRequests></PullRequests>
      </Container>
    </div>
  );
}

export default App;
