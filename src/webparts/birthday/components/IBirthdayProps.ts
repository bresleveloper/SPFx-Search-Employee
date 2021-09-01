import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBirthdayProps {
  before: string;
  after: string;
  context: WebPartContext;
}
