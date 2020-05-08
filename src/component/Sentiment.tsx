import React, { Component } from "react";
import { Client, Response } from "../service/sentiment/sentiment-client";
import SentimentScore from "./SentimentScore";

interface SentimentProp {
  commentId: string;
  commentContent: string;
  dataLoadedCallback: Function;
}

interface SentimentState {
  loading: boolean;
  sentimentResponse?: Response;
}

class Sentiment extends Component<SentimentProp, SentimentState> {
  constructor(props: SentimentProp) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const sentimentClient = new Client();
    sentimentClient
      .analyzeSentiment(this.props.commentId, {
        document: {
          type: "HTML",
          content: this.props.commentContent,
        },
      })
      .then((res) => {
        this.setState({
          loading: false,
          sentimentResponse: res,
        });
        this.props.dataLoadedCallback(res);
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading Sentiment...</div>;
    }

    const score = this.state.sentimentResponse?.documentSentiment.score || 0;
    const magnitude =
      this.state.sentimentResponse?.documentSentiment.magnitude || 0;

    return (
      <SentimentScore score={score} magnitude={magnitude}></SentimentScore>
    );
  }
}

export default Sentiment;
