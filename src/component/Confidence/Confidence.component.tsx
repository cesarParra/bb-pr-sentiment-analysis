import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
} from "@material-ui/core";

interface ConfidenceProps {
  confidenceScore: number;
  confidenceSymbol: string;
}

const Confidence: React.FunctionComponent<ConfidenceProps> = ({
  confidenceScore,
  confidenceSymbol,
}) => (
  <Box mt={1}>
    <Card>
      <CardHeader
        title="Overall Uncertainty"
        subheader="Lower is better"
      ></CardHeader>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {confidenceScore} {confidenceSymbol}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default Confidence;
