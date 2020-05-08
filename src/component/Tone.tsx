import React, { Component } from "react";
import { Client, Result } from "../service/tone/tone-client";
import Mesh from "./Mesh";
import { Card, CardContent, Typography } from "@material-ui/core";

interface ToneProps {
  text: string;
  commentId: string;
  toneResultLoadedCallback: Function;
}

interface ToneState {
  loading: boolean;
  analysis?: Result;
}

class Tone extends Component<ToneProps, ToneState> {
  constructor(props: ToneProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if (!this.props.text) {
      return;
    }
    new Client()
      .analyzeTone(this.props.commentId, this.props.text)
      .then((analysis) => {
        this.props.toneResultLoadedCallback(analysis);
        this.setState({ loading: false, analysis: analysis });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading Tone Information...</div>;
    }

    if (!this.state.analysis) {
      return <div>Tones could not be loaded</div>;
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Tone Analysis
          </Typography>
          <Mesh documentTone={this.state.analysis.document_tone}></Mesh>
        </CardContent>
      </Card>
    );
  }
}

export default Tone;
