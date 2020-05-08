import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

interface PullRequestFormProps {
  submitHandler: Function;
}

export default class PullRequestForm extends Component<PullRequestFormProps> {
  state = {
    repo: null,
    prId: null,
  };

  handleRepoChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ repo: event.target.value });
  }

  handlePrIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ prId: event.target.value });
  }

  handleButtonClick() {
    console.log("The button was clicked");
  }

  render() {
    return (
      <div>
        <form>
          <TextField
            value={this.state.repo}
            label="Repo"
            onChange={this.handleRepoChange.bind(this)}
          />
          <TextField
            value={this.state.prId}
            label="Pull Request Id"
            onChange={this.handlePrIdChange.bind(this)}
          />
          <Button
            onClick={(event) => {
              this.props.submitHandler(this.state.repo, this.state.prId);
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
