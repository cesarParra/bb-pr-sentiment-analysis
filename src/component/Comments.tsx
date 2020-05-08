import React, { Component } from "react";
import BitbucketApi from "../service/bitbucket/bitbucket_api";
import { CommentData, Value } from "../service/bitbucket/comment";
import Sentiment from "./Sentiment";
import Tone from "./Tone";
import { Card, CardContent, Typography, Box, Grid } from "@material-ui/core";
import { Response } from "../service/sentiment/sentiment-client";
import { Result as ToneResult } from "../service/tone/tone-client";
import { Confidence } from ".";
import Mesh from "./Mesh";
import { DocumentTone } from "../service/tone/tone-client";
import SentimentScore from "./SentimentScore";
import PullRequestForm from "./PullRequestForm";

interface CommentsProps {
  repo?: string;
  prId?: number;
}

interface CommentsState {
  prSelected: boolean;
  loading: boolean;
  commentData?: CommentData;
  sentimentAverage: number;
  totalMagnitude: number;
  tonesOverview: TonesOverview;
}

export interface TonesOverview {
  overviews: ToneOverview[];
}

interface ToneOverview {
  tone_name: string;
  score: number;
}

class Comments extends Component<CommentsProps, CommentsState> {
  childSentiments: Response[];
  toneResults: ToneResult[];

  constructor(props: CommentsProps) {
    super(props);
    this.childSentiments = [];
    this.toneResults = [];
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      prSelected: false,
      loading: true,
      sentimentAverage: 0,
      totalMagnitude: 0,
      tonesOverview: {
        overviews: [
          { tone_name: "Anger", score: 0 },
          { tone_name: "Fear", score: 0 },
          { tone_name: "Joy", score: 0 },
          { tone_name: "Sadness", score: 0 },
          { tone_name: "Analytical", score: 0 },
          { tone_name: "Confident", score: 0 },
          { tone_name: "Tentative", score: 0 },
        ],
      },
    };
  }

  // componentDidUpdate(prevProps: CommentsProps) {
  //   // TODO: This is breaking the search
  //   // if (
  //   //   this.props.repo === prevProps.repo &&
  //   //   this.props.prId === prevProps.prId
  //   // ) {
  //   //   return;
  //   // }
  //   // if (this.props.repo && this.props.prId) {
  //   //   this.handlePrSearch(this.props.repo, this.props.prId.toString());
  //   // }
  // }

  handlePrSearch(repo: string, prId: string) {
    this.childSentiments = [];
    this.toneResults = [];

    new BitbucketApi().getPRComments(repo, parseInt(prId)).then((res) => {
      console.log("Setting the state after search", res);
      this.setState({
        ...this.getInitialState(),
        prSelected: true,
        loading: false,
        commentData: res,
      });
    });
  }

  render() {
    if (!this.state.prSelected) {
      return (
        <div>
          {this.renderPullRequestSearchForm()}
          <div>Search for a PR</div>
        </div>
      );
    }

    if (this.state.loading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        {this.renderPullRequestSearchForm()}
        <Typography gutterBottom variant="h2" component="h2">
          Comments
        </Typography>
        <SentimentScore
          score={this.state.sentimentAverage}
          magnitude={this.state.totalMagnitude}
        ></SentimentScore>
        <Confidence
          sentimentAverage={this.state.sentimentAverage}
          totalMagnitude={this.state.totalMagnitude}
          tonesOverview={this.state.tonesOverview}
        ></Confidence>
        {this.renderToneMesh()}
        {this.renderCards()}
      </div>
    );
  }

  renderPullRequestSearchForm() {
    return (
      <PullRequestForm
        submitHandler={this.handlePrSearch.bind(this)}
      ></PullRequestForm>
    );
  }

  renderCards() {
    if (!this.state.commentData) {
      return <div>Loading</div>;
    }
    return this.state.commentData?.values
      .filter(
        (value) =>
          value.user.display_name !== "Build Agent" && value.content.raw
      )
      .map((value) => {
        return (
          <Box key={value.id} mb={1}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.user.display_name}
                </Typography>
                <Box mb={1}>
                  <Card style={{ backgroundColor: "#fafafa" }} elevation={0}>
                    <CardContent>
                      {this.htmlDecode(value.content.html)}
                    </CardContent>
                  </Card>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    {this.renderSentiment(value)}
                  </Grid>
                  <Grid item xs={6}>
                    {this.renderTone(value)}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
      });
  }

  renderToneMesh() {
    console.log("Refreshing tones");
    const documentTones = this.state.tonesOverview.overviews.map((overview) => {
      return {
        score: overview.score,
        tone_name: overview.tone_name,
      };
    });
    const documentTone = { tones: documentTones } as DocumentTone;
    return <Mesh documentTone={documentTone} listenForUpdates={true}></Mesh>;
  }

  renderSentiment(value: Value) {
    if (value.user.display_name === "Build Agent") {
      return <span>Build Agent, sentiment analysis not performed</span>;
    }

    return (
      <Sentiment
        dataLoadedCallback={this.sentimentLoadedCallback.bind(this)}
        commentId={value.id.toString()}
        commentContent={value.content.html}
      ></Sentiment>
    );
  }

  sentimentLoadedCallback(sentimentResponse: Response) {
    this.childSentiments.push(sentimentResponse);
    const overallToneSum = this.childSentiments.reduce(
      (previousValue, currentResponse) =>
        previousValue + currentResponse.documentSentiment.score,
      0
    );

    const overallMagSum = this.childSentiments.reduce(
      (previousValue, currentResponse) =>
        previousValue + currentResponse.documentSentiment.magnitude,
      0
    );

    this.setState({
      ...this.state,
      sentimentAverage: overallToneSum / this.childSentiments.length,
      totalMagnitude: overallMagSum,
    });
  }

  renderTone(value: Value) {
    if (value.user.display_name === "Build Agent") {
      return <span>Build Agent, tone analysis not performed</span>;
    }

    return (
      <Tone
        toneResultLoadedCallback={this.toneLoadedCallback.bind(this)}
        commentId={value.id.toString()}
        text={value.content.raw}
      ></Tone>
    );
    //return <div>Tone Analysis: Off</div>;
  }

  toneLoadedCallback(toneResult: ToneResult) {
    this.toneResults.push(toneResult);
    // this.toneResults.forEach((currentToneResult)=>{
    //   const foundTone
    // });
    toneResult.document_tone.tones.forEach((currentTone) => {
      let foundToneOverviewIndex = this.state.tonesOverview.overviews.findIndex(
        (currentOverview) => currentOverview.tone_name === currentTone.tone_name
      );
      if (foundToneOverviewIndex >= 0) {
        let foundToneOverview = this.state.tonesOverview.overviews[
          foundToneOverviewIndex
        ];
        foundToneOverview = {
          ...foundToneOverview,
          score: foundToneOverview.score + currentTone.score,
        };

        let currentOverviewState = this.state.tonesOverview;
        currentOverviewState.overviews[
          foundToneOverviewIndex
        ] = foundToneOverview;
        this.setState({ ...this.state, tonesOverview: currentOverviewState });
      }
    });
  }

  htmlDecode(input: string) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
}

export default Comments;
