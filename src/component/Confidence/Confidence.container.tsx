import React, { Component } from "react";
import ChildComponent from "./Confidence.component";
import ConfidenceService from "../../service/confidence/confidence-service";
import { TonesOverview } from "../Comments";

interface ConfidenceProps {
  sentimentAverage: number;
  totalMagnitude: number;
  tonesOverview: TonesOverview;
}

export default class Confidence extends Component<ConfidenceProps, {}> {
  render() {
    const { sentimentAverage, totalMagnitude, tonesOverview } = this.props;
    const confidenceScore = parseFloat(
      ConfidenceService.calculateConfidence(
        sentimentAverage,
        totalMagnitude,
        tonesOverview
      ).toFixed(2)
    );
    let symbol = "🚢";
    if (confidenceScore > 20) {
      symbol = "⚠️";
    }
    if (confidenceScore > 60) {
      symbol = "☠️";
    }
    return (
      <ChildComponent
        confidenceScore={confidenceScore}
        confidenceSymbol={symbol}
      ></ChildComponent>
    );
  }
}
