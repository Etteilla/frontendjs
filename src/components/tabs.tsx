import React, { Component } from 'react'; // we need this to make JSX compile
import * as en from "../translations/en.json";
import * as fr from "../translations/fr.json";

import { tx, install } from "@twind/core";
import config from '../twind.config';

// activate twind
install(config)


// setup({
//     preflight: false, // do not include base style reset (default: use tailwind preflight)
//     mode: strict, // throw errors for invalid rules (default: warn)
//     hash: false, // hash all generated class names (default: false)
//     // theme: {}, // define custom theme values (default: tailwind theme)
//     darkMode: 'class', // use a different dark mode strategy (default: 'media')
    
//     theme: {
//         fontFamily: {
//             sans: ['Montserrat', 'sans-serif']
//           },
//     },
//     sheet: sheet,
// })



// 2. Use that to create an own twind instance


interface TabsProps {
    currentLang: string
}


export class EtteillaTabs extends Component<TabsProps, {}> {
    tabs = [
        { name: 'By Archetype', href: '#', current: true },
        { name: 'By Family', href: '#', current: false },
        { name: 'By Country', href: '#', current: false },
        { name: 'By Manufacturer', href: '#', current: false },
    ]

    translations = {
        "en": en,
        "fr": fr
    }

    constructor(props: TabsProps) {
        super(props);
    }

    override render() {
        // 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
        //                                 'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
        // type ObjectKey = keyof typeof this.translations;
        // const myLang = this.state.currentLang as ObjectKey;
        return (
            
            <div>
                <div className={tx('sm:hidden')}>
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        defaultValue={this.tabs[0].name}>
                        {this.tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
                            {this.tabs.map((tab) => (
                                <a
                                    key={tab.name}
                                    href={tab.href}
                                    className="border-indigo-500 text-indigo-600 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-4 px-1 text-base"
                                    aria-current={tab.current ? 'page' : undefined}
                                >
                                    {tab.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
