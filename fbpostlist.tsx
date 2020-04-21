import * as React from "react";
import FbPost from "./FbPost";


export interface IFbPostListProp extends React.Props<any> {
    access_token: string;
    pageId: string;
    limit: Number;
}
export default class FbPostList extends React.Component<IFbPostListProp, any> {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: false
        };
    }
    private  Loading():JSX.Element {
        if (this.state.loading) {
            return <div>
                <span><img src="/spinner.gif" alt="loading" /></span>
            </div>;
        }
        return;
    }
    private RenderItems():JSX.Element {
        if(this.state.loading) {
            return;
        }
        if (this.state.items.length === 0 && !this.state.loading) {
            return <span>no posts</span>;
        } else {
            // tslint:disable-next-line:typedef
            var items = [];
            this.state.items.forEach(item => {
                // tslint:disable-next-line:max-line-length
                items.push(<FbPost caption={item.caption} created_time={item.created_time} link={item.link} message={item.message} picture={item.picture} full_picture={item.full_picture} name={item.name}/>);
            });
            return <ul>
                {items}
            </ul>;
        }
    }
    public render(): JSX.Element {
        return (
            <div>
                <div>
                    {this.Loading()}
                    {this.RenderItems()}
                </div>
            </div>
        );
    }
    public  componentWillMount():void {
        // tslint:disable-next-line:max-line-length
        fetch("https://graph.facebook.com/"+"v3.1"+"/"+this.props.pageId+"/feed?fields=caption,full_picture,created_time,link,message,message_tages,name,picture&limit="+this.props.limit,
            {
                method:"GET",
                headers:{
                    "Authorization":"Bearer "+this.props.access_token
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            this.setState({ items: data.data, loading: false });
        });
    }
}
