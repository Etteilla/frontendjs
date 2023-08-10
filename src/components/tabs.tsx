import React, { Component } from 'react'; // we need this to make JSX compile
import ReactShadowRoot from 'react-shadow-root';

import * as en from "../translations/en.json";
import * as fr from "../translations/fr.json";

// import twind from '../twind';
import { cssom, twind } from "@twind/core";
import config from '../twind.config';
import { Tab } from '@headlessui/react';

// Use sheet and config to create an twind instance. `tw` will
// append the right CSS to our custom stylesheet.
const sheet = cssom(new CSSStyleSheet());
const tw = twind(config, sheet);

interface TabsProps {
    currentLang: string
    container: string
    apiKey: string
}

interface TabsState {
    tabs: Array<Tab>
}


interface Tab {
    name: string
    href: string
    current: boolean
    key: string
}



function classNames(tab: Tab) {
    let classes = tab.current ? 'border-stone-800 text-stone-800' : 'border-transparent text-stone-800 hover:border-purple-500 hover:text-purple-500'
    return classes + ' whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
}


export class EtteillaTabs extends Component<TabsProps, TabsState> {

    translations = {
        "en": en,
        "fr": fr
    }
    
    override state: TabsState = {
        tabs: [
            { name: 'By Archetype', href: '#', current: true, key: "tabs-archetype"},
            { name: 'By Family', href: '#', current: false, key: "tabs-family"},
            { name: 'By Country', href: '#', current: false, key: "tabs-country"},
            { name: 'By Manufacturer', href: '#', current: false, key: "tabs-manufacturer"},
        ]
    };

    constructor(props: TabsProps) {
        super(props);
    }

    
    handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        let tabKey = event.currentTarget.getAttribute("id");
        let tabs = this.state.tabs;
        tabs.forEach(tab => {
            tab.current = false
            if (tab.key == tabKey) {
                tab.current = true
            }
        })
        this.setState({tabs: tabs})
    }

    override componentDidMount(): void {
        this.init();
    }

    init() {
        this.state.tabs.forEach( (tab:Tab) => {
            if (tab.url !== "") {
                let completeUrl = tab.url + "?key=" + this.props.apiKey
                fetch(completeUrl, { method: "GET" }).then(resp => {
                    console.log(resp.json())
                })
            
            }
        });
    }

    override render() {
        return (
            <ReactShadowRoot stylesheets={[sheet.target]}>
                <div className={tw('sm:hidden')}>
                    <label htmlFor="tabs" className={tw("sr-only")}>
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className={tw("block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                        defaultValue="tabs[0].name">
                        {this.state.tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className={tw("hidden sm:block")}>
                    <div className={tw("border-b border-gray-200")}>
                        <nav className={tw("-mb-px flex justify-center space-x-8")} aria-label="Tabs" >
                            {this.state.tabs.map((tab) => (
                                <a  
                                    id={tab.key}
                                    key={tab.key}
                                    href={tab.href}
                                    className={tw(classNames(tab))}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={this.handleClick} >
                                    {tab.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </ReactShadowRoot>
        );
    }
}
