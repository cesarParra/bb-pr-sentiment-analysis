import React, { Component } from "react";
import { Card, CardContent, Typography, Box } from "@material-ui/core";

interface SentimentScoreProps {
  score: number;
  magnitude: number;
}

class SentimentScore extends Component<SentimentScoreProps, {}> {
  render() {
    const score = this.props.score;
    const fraction = (score || 0) / 2 + 0.5;
    const red = Math.min(2 - 2 * fraction, 1) * 255;
    const green = Math.min(2 * fraction, 1) * 255;
    const rgb = [red, green, 0];

    return (
      <Box>
        <Box mb={1}>
          <Card style={{ backgroundColor: `rgb(${rgb})` }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Sentiment Score
              </Typography>
              <Typography gutterBottom variant="h5" component="h5">
                {score}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Card>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Magnitude
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              {this.props.magnitude.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default SentimentScore;
