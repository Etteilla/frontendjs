
import React, { Component } from 'react'; // we need this to make JSX compile

enum TreeNationThemeEnum {
    dark = "black",
    light = "white"
  }

// Clock Example of the React Webpage with Props, State & Lifecycle
export interface TreeNationProps {
    tnid: string;
    lang: string;
    theme: string;
    height?: string;
    width?: string;
}


export class Tnlogo extends Component<TreeNationProps, {}> {

    imgURL: string;
    theme: TreeNationThemeEnum = TreeNationThemeEnum.light; 

    static defaultProps = {
        lang: "en",
        theme: TreeNationThemeEnum.light,
        height: "50px",
        width: "157px"
    }

    constructor(props: TreeNationProps) {
        super(props);
        if (this.props.theme === "dark") {
            this.theme = TreeNationThemeEnum.dark
        }
        if (this.props.theme === "light") {
            this.theme = TreeNationThemeEnum.light
        }
        this.imgURL = "https://tree-nation.com/images/tracking/label-co2-website-" + this.theme + "-" + this.props.lang + ".png";
        
    }

    override componentDidMount() {
        this.track();
    }

    override componentWillUnmount() {
        console.log("unMounted")
    }
    track() {
        console.log("contacting treenation " + this.props.tnid) 
        const url = 'https://tree-nation.com/track/web/' + this.props.tnid;
        fetch(url, {method: "GET", mode: "cors"});
    }

    override render() {
        return (
            <a aria-label="Etteilla Foundation Tree Nation profile" href="https://tree-nation.com/profile/impact/etteilla-foundation#co2" target="_blank" rel="noopener">
                <img decoding="async" loading="lazy" alt="tree nation zero carbon website label" width={this.props.width} height={this.props.height} src={this.imgURL} />
            </a>
        );
    }
}

