import * as React from "react";

export interface IFbPost extends React.Props<any> {
    caption?:String;
    full_picture?:String;
    picture?:String;
    created_time:Date;
    link?:String;
    message:String;
    name:string;
}
export default class FbPost extends React.Component<IFbPost, {}> {
  public render(): JSX.Element {
    return (
        <li>
            <div>
                <h1>{this.props.name}</h1>
                <span>{this.props.caption}</span>
                <span>{this.props.message}</span>
            </div>
        </li>
    );
  }
}
