import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBirthdayProps {
  before: string;
  after: string;
  context: WebPartContext;
  minHeight:string;
  Dots: boolean;
  Speed: number;
  SlidesToShow: number;
  PauseOnHover: boolean;
  Autoplay: boolean;
  AutoplaySpeed: number;
}
