import { CommentData } from "./comment";
import { PullRequestData } from "./pull_requests";
import base64 from "base-64";

export default class BitbucketApi {
  async getPRComments(project: string, prId: number): Promise<CommentData> {
    // TODO: Use dotenv?
    const login = "<<username>>";
    const password = "<<pass>>";
    const response = await fetch(
      `https://api.bitbucket.org/2.0/repositories/<project>/${project}/pullrequests/${prId}/comments?pagelen=100`,
      {
        headers: new Headers({
          Authorization: `Basic ${base64.encode(`${login}:${password}`)}`,
        }),
      }
    );

    const parsedResponse = await response.json();
    return parsedResponse as CommentData;
  }

  async getPullRequests(project: string): Promise<PullRequestData> {
    // TODO: This is not bringing back merged ones, which I want
    const login = "<<username>>";
    const password = "<<pass>>";
    const response = await fetch(
      `https://api.bitbucket.org/2.0/repositories/<project>/${project}/pullrequests?pagelen=30`,
      {
        headers: new Headers({
          Authorization: `Basic ${base64.encode(`${login}:${password}`)}`,
        }),
      }
    );

    const parsedResponse = await response.json();
    return parsedResponse as PullRequestData;
  }
}
