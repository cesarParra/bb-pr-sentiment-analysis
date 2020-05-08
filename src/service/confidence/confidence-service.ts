import { TonesOverview } from "../../component/Comments";

class ConfidenceService {
  static toneWeight = new Map([
    ["Anger", 10],
    ["Fear", 10],
    ["Joy", -10],
    ["Sadness", 10],
    ["Analytical", 0],
    ["Confident", -10],
    ["Tentative", 5],
  ]);

  static calculateConfidence(
    sentimentAverage: number,
    totalMagnitude: number,
    tonesOverview: TonesOverview
  ): number {
    const sentimentScore = this.getOverallSentimentScore(
      sentimentAverage,
      totalMagnitude
    );
    console.log("The sentiment score", sentimentScore);
    const toneScore = this.getToneScore(tonesOverview);
    console.log("The tone score", toneScore);
    return sentimentScore + toneScore;
  }

  private static getOverallSentimentScore(
    sentimentAverage: number,
    totalMagnitude: number
  ) {
    const sentiment = this.getBase100Sentiment(sentimentAverage);
    if (sentiment <= -5) {
      // Overall negative sentiment, thus the magnitude is weighted heavier
      return totalMagnitude * Math.abs(sentiment);
    } else if (sentiment >= 5) {
      // Overall positive sentiment, thus the magnitude is weighted less
      return totalMagnitude / sentiment;
    }

    // Overall neutral sentiment, which means that a higher magnitude represents mixed feelings,
    // thus we return the magnitude as is
    return totalMagnitude;
  }

  private static getBase100Sentiment(sentimentAverage: number) {
    return sentimentAverage * 100;
  }

  private static getToneScore(tonesOverview: TonesOverview) {
    return tonesOverview.overviews.reduce((toneScore, currentTone) => {
      const weight = this.toneWeight.get(currentTone.tone_name);
      if (!weight) {
        return toneScore;
      }
      return toneScore + weight * currentTone.score;
    }, 0);
  }
}

export default ConfidenceService;
