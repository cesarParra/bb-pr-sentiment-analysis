import DbClient from "../db/db-client";

export interface Document {
  type: string;
  content: string;
}

export interface Request {
  document: Document;
}

export interface DocumentSentiment {
  magnitude: number;
  score: number;
}

export interface Text {
  content: string;
  beginOffset: number;
}

export interface Sentiment {
  magnitude: number;
  score: number;
}

export interface Sentence {
  text: Text;
  sentiment: Sentiment;
}

export interface Response {
  documentSentiment: DocumentSentiment;
  language: string;
  sentences: Sentence[];
}

export class Client {
  async analyzeSentiment(
    commentId: string,
    request: Request
  ): Promise<Response> {
    const mock = false;
    if (mock) {
      return this.mockApiCall();
    }

    // First we try and see if we have the data in the db, to try and avoid making sentiment API calls
    const dbClient = new DbClient();
    const dbAnalysis = await dbClient.getSentimentAnalysis(commentId);
    if (dbAnalysis) {
      return dbAnalysis;
    }

    console.log("Not found in the db, making sentiment API call");
    const sentimentPromise = this.callApi(request);
    const sentimentResponse = await sentimentPromise;
    dbClient.saveSentimentAnalysis(commentId, sentimentResponse);
    return sentimentResponse;
  }

  async callApi(request: Request) {
    const url =
      "https://language.googleapis.com/v1/documents:analyzeSentiment?key=<<key>>";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const jsonResponse = await response.json();
    return jsonResponse as Response;
  }

  async mockApiCall() {
    const multiplier = Math.random() > 0.5 ? 1 : -1;
    return {
      // TODO: Would it be possible to compile all comments so we just make a single call?
      documentSentiment: {
        magnitude: parseFloat(Math.random().toFixed(2)) * multiplier,
        score: parseFloat(Math.random().toFixed(2)) * multiplier,
      },
      language: "en",
      sentences: [
        {
          text: {
            content: "I love it",
            beginOffset: -1,
          },
          sentiment: {
            magnitude: Math.random(),
            score: Math.random(),
          },
        },
      ],
    };
  }
}
