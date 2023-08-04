
import React, { Component } from 'react'; // we need this to make JSX compile
import * as en from "../translations/en.json";
import * as fr from "../translations/fr.json";

interface LangDropdownProps {
    currentLang: string
    allLangs: any[]
}

interface LangDropDownState {
    isDropDownOpen: boolean;
    currentLang: string;
}

export class LangDropdown extends Component<LangDropdownProps, LangDropDownState> {

    translations = {
        "en": en,
        "fr": fr
    }
    override state: LangDropDownState = {
        isDropDownOpen: false,
        currentLang: "en"
    };

    constructor(props: LangDropdownProps) {
        super(props);
    }

    override componentDidMount(): void {
        this.setState({ currentLang: this.props.currentLang, isDropDownOpen: false });
    }

    handleMenu = () => {
        console.log("Click on lang");
        this.setState({ isDropDownOpen: !this.state.isDropDownOpen });
    }

    override render() {
        type ObjectKey = keyof typeof this.translations;
        const myLang = this.state.currentLang as ObjectKey;
        return (
            <div className={this.state.isDropDownOpen ? "navbar-item has-dropdown is-active" : "navbar-item has-dropdown"}>
                <div className="navbar-link" aria-haspopup="true" aria-controls="dropdown-lang" onClick={this.handleMenu}>
                    <span className="icon is-small mr-2 white">
                        <svg aria-hidden="true"><use href="#globe" /></svg>
                    </span>
                    <span>{this.translations[myLang][myLang]}</span>
                </div>
                <div className="navbar-dropdown is-right">
                    <ul className="dropdown-item">

                        {
                            this.props.allLangs.map(langData => {
                                const otherLangOk = langData.lang as ObjectKey;
                                if (langData.lang != myLang) {
                                    return (
                                        <li key={langData.lang}>
                                            <a href={langData.url} >{this.translations[otherLangOk][otherLangOk]}</a>
                                        </li>
                                    )
                                } else {
                                    return;
                                }
                            }
                            )}
                    </ul>
                </div>
            </div>
        );
    }
}
