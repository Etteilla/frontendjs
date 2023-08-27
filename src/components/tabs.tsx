'use client';
import React, { Component } from 'react'; // we need this to make JSX compile
import ReactShadowRoot from 'react-shadow-root';

import { AnimatePresence, motion } from "framer-motion"

import * as en from "../translations/en.json";
import * as fr from "../translations/fr.json";

// import twind from '../twind';
import { cssom, twind } from "@twind/core";
import config from '../twind.config';

import { EtteillaCard, cardsheet } from './cards';

import { EtteillaApiService, EtteillaData } from '../ApiService';

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
    currentList: Array<EtteillaData>
    currentTabIndex: number
}

interface Tab {
    name: string
    current: boolean
    key: string
    model: string
    data: Array<EtteillaData>
    loaded: boolean
}


export class EtteillaTabs extends Component<TabsProps, TabsState> {
    allUrls = {}
    translations = {
        "en": en,
        "fr": fr
    }

    override state: TabsState = {
        tabs: [
            { name: 'By Archetype', current: true, key: "tabs-archetype", model: "decktypes", data: [], loaded: false },
            { name: 'By Family', current: false, key: "tabs-family", model: "families", data: [], loaded: false },
            { name: 'By Country', current: false, key: "tabs-country", model: "countries", data: [], loaded: false },
            { name: 'By Manufacturer', current: false, key: "tabs-manufacturer", model: "manufacturers", data: [], loaded: false },
        ],
        currentList: [],
        currentTabIndex: 0
    };

    constructor(props: TabsProps) {
        super(props);
    }

    async init() {
        // let frontend = new EtteillaFrontEndService('urls', this.props.currentLang)
        // this.allUrls = frontend.getURLS()

        let tabs = this.state.tabs
        let tab = await this.loadTabData(tabs[0], this.props.currentLang)
        let tab1 = await this.loadTabData(tabs[1], this.props.currentLang)
        let tab2 = await this.loadTabData(tabs[2], this.props.currentLang)
        let tab3 = await this.loadTabData(tabs[3], this.props.currentLang)


        tabs[0] = tab
        tabs[1] = tab1
        tabs[2] = tab2
        tabs[3] = tab3

        this.setState({ tabs: tabs, currentList: tab.data })
    }

    async loadTabData(tab: Tab, lang: string) {
        let api = new EtteillaApiService<EtteillaData>(tab.model, lang);
        let data = await api.getList()
        tab.data = data
        tab.loaded = true
        return tab
    }

    override componentDidMount(): void {
        this.init();
    }

    classNames(tab: Tab) {
        let classes = tab.current ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-800 hover:text-purple-500'
        return classes + ' whitespace-nowrap py-4 px-1 text-base font-medium hover:cursor-pointer relative'
    }
    selectTab(selectedTabIndex: number) {
        let tabs = this.state.tabs;
        tabs.forEach((tab, index) => {
            tab.current = false
            if (index == selectedTabIndex) {
                tab.current = true
                this.setState({ currentTabIndex: index, currentList: tab.data })
            }
        })
        this.setState({ tabs: tabs })
    
    }
    handleClick = (event: any) => {
        let tabId = event.currentTarget.getAttribute("id").split("-");
        let selectedTabIndex = tabId[1];
        this.selectTab(selectedTabIndex);
    }

    switchTab = (event: any) => {
        this.selectTab(event.target.value);
    }

    override render() {
        return (
            <ReactShadowRoot stylesheets={[sheet.target, cardsheet.target]}>
                <div className={tw('sm:hidden')}>
                    <select
                        id="tabs"
                        name="tabs"
                        className={tw("block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm")}
                        defaultValue="tabs[0].name"
                        onChange={this.switchTab}>
                        {this.state.tabs.map((tab, index) => (
                            <option key={"select" + tab.key} id={"selecttab-" + index } value={index}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className={tw("hidden md:block box-border")}>
                    <div className={tw("border-b border-gray-200")}>
                        <ul className={tw("-mb-px flex justify-center space-x-8")} aria-label="Tabs" >
                            {this.state.tabs.map((tab, index) => (
                                <li
                                    id={"tab-" + index}
                                    key={tab.key}
                                    className={tw(this.classNames(tab))}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={this.handleClick} >
                                    {tab.name}
                                    {tab.current ? (
                                        <motion.div className={tw("absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500")} layoutId="underline" />
                                    ) : null
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ul
                    role="list" className={tw("grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-4")}>
                    <AnimatePresence>
                        {this.state.currentList.map((item: any) => (
                            <EtteillaCard model={item} key={item.shortname + item.id} />
                        ))}
                    </AnimatePresence>
                </ul>
            </ReactShadowRoot>
        );
    }
}
