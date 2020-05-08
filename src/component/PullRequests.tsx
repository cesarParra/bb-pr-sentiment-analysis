import React, { PureComponent } from "react";
import BitbucketApi from "../service/bitbucket/bitbucket_api";
import { PullRequestData } from "../service/bitbucket/pull_requests";
import Comments from "./Comments";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Grid,
} from "@material-ui/core";

interface PullRequestsState {
  loading: boolean;
  pullRequestData?: PullRequestData;
  repo: string;
  selectedPrId?: number;
}

class PullRequests extends PureComponent<{}, PullRequestsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      loading: true,
      repo: "---",
    };
  }

  componentDidMount() {
    new BitbucketApi().getPullRequests(this.state.repo).then((res) => {
      this.setState({
        loading: false,
        pullRequestData: res as PullRequestData,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading Pull Requests...</div>;
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <List>{this.renderPullRequests()}</List>
        </Grid>
        <Grid item xs={9}>
          <Comments
            repo={this.state.repo}
            prId={this.state.selectedPrId}
          ></Comments>
        </Grid>
      </Grid>
    );
  }

  handleListItemClick(prId: number) {
    this.setState({ selectedPrId: prId });
  }

  renderPullRequests() {
    return this.state.pullRequestData?.values.map((pr) => {
      return (
        <span>
          <ListItem
            button
            alignItems="flex-start"
            onClick={(event) => {
              this.handleListItemClick(pr.id);
            }}
          >
            <ListItemAvatar>
              <Avatar src={pr.author.links.avatar.href} alt="Avatar"></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={pr.title}
              secondary={pr.description}
            ></ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </span>
      );
    });
  }
}

export default PullRequests;
