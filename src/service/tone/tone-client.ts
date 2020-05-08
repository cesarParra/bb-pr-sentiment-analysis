import DbClient from "../db/db-client";
import base64 from "base-64";

export interface Tone {
  score: number;
  tone_id: string;
  tone_name: string;
}

export interface DocumentTone {
  tones: Tone[];
}

export interface SentencesTone {
  sentence_id: number;
  text: string;
  tones: Tone[];
}

export interface Result {
  document_tone: DocumentTone;
  sentences_tone: SentencesTone[];
}

export class Client {
  async analyzeTone(commentId: string, text: string) {
    const dbClient = new DbClient();
    const toneAnalysis = await dbClient.getToneAnalysis(commentId);
    if (toneAnalysis) {
      return toneAnalysis;
    }

    const login = "<key>";
    const password = "<<pass>>";
    const response = await fetch("<<url>>", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64.encode(`${login}:${password}`)}`,
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const parsedResponse = await response.json();
    dbClient.saveToneAnalysis(commentId, parsedResponse);
    return parsedResponse as Result;
  }
}
