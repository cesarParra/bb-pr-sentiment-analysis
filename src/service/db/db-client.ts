import firebase from "firebase";
import { Response } from "../sentiment/sentiment-client";
import { Result } from "../tone/tone-client";
require("firebase/firestore");

export default class DbClient {
  db: firebase.firestore.Firestore;
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "<<key>>",
        authDomain: "<<domain>>",
        databaseUrl: "<<url>>",
        projectId: "<<project-id>>",
      });
    }
    this.db = firebase.firestore();
  }

  async getSentimentAnalysis(commentId: string) {
    const docRef = this.db.collection("sentiments").doc(commentId);
    const document = await docRef.get();
    if (document.exists) {
      return document.data() as Response;
    }

    console.log("The document was not found in the db");
    return undefined;
  }

  saveSentimentAnalysis(commentId: string, sentimentRespose: Response) {
    this.db.collection("sentiments").doc(commentId).set(sentimentRespose);
  }

  async getToneAnalysis(commentId: string) {
    const docRef = this.db.collection("tones").doc(commentId);
    const document = await docRef.get();
    if (document.exists) {
      console.log("The tone was found in the db, returning");
      return document.data() as Result;
    }

    console.log("The tone was not found in the db");
    return undefined;
  }

  saveToneAnalysis(commentId: string, toneAnalysisResponse: Result) {
    this.db.collection("tones").doc(commentId).set(toneAnalysisResponse);
  }
}
