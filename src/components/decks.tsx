'use client';
import React, { Component } from 'react'; // we need this to make JSX compile
import ReactShadowRoot from 'react-shadow-root';

import { AnimatePresence, motion } from "framer-motion"


import { cssom, twind } from "@twind/core";
import config from '../twind.config';


import { EtteillaApiService, EtteillaDeckData } from '../ApiService';

// Use sheet and config to create an twind instance. `tw` will
// append the right CSS to our custom stylesheet.
const sheet = cssom(new CSSStyleSheet());
const tw = twind(config, sheet);

interface DeckListProps {
    currentLang: string
}

interface DeckListState {
    decks: Array<EtteillaDeckData>
}



export class EtteillaHorizontalDeckList extends Component<DeckListProps, DeckListState> {

    override state: DeckListState = {
        decks: []
    };

    async init() {
        let decks = await this.loadDeckList(this.props.currentLang)
        console.log(decks)
        this.setState({ decks: decks })
    }

    async loadDeckList(lang: string) {
        let api = new EtteillaApiService<EtteillaDeckData>("decks", lang);
        let data = await api.getList()
        return data
    }

    override componentDidMount(): void {
        this.init();
    }


    override render() {
        return (
            <ReactShadowRoot stylesheets={[sheet.target]}>
                <div className={tw("mt-5 space-y-20 lg:space-y-20")}>
                    <AnimatePresence>
                        {this.state.decks.map((deck, index) => (
                            <motion.article
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{
                                    translateY: -2,
                                    transition: { duration: 0.2 },
                                }}
                                key={deck.id} className={tw("relative isolate flex flex-col gap-8 lg:flex-row items-start p-5 rounded-md bg-white ring-1 ring-gray-300 hover:drop-shadow-2xl hover:cursor-pointer")}
                                itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <meta itemProp="position" content={(index + 1).toString()}></meta>

                                {deck.images &&
                                    <div className={tw("aspect-square basis-auto shrink-0 grow-0")}>
                                        <picture>
                                            <source
                                                type="image/webp"
                                                srcSet={deck.images.webp}
                                                sizes="(max-width: 768px) 100vw, 33vw" />
                                            <source
                                                type="image/avif"
                                                srcSet={deck.images.avif}
                                                sizes="(max-width: 768px) 100vw, 33vw" />
                                            <img
                                                itemProp="contentUrl" alt={deck.name} decoding="auto" loading="eager" width="220" height=""
                                                src={deck.images.base} sizes="(max-width: 768px) 100vw, 33vw"
                                                srcSet={deck.images.jpeg}
                                                className={tw("rounded-md bg-gray-500 object-cover object-center w-full md:w-full lg:w-80 xl:w-64" )} />
                                        </picture>
                                    </div>
                                }

                                <div className={tw("basis-auto shrink grow")}>
                                    <div className={tw("flex items-center gap-x-4 text-xs")}>
                                        <time dateTime={deck.updated} className={tw("text-gray-500")}>
                                            {deck.updated}
                                        </time>
                                        <motion.a
                                            whileHover={{
                                                translateY: -2,
                                                transition: { duration: 0.2 },
                                            }}
                                            href={deck.deckType.url}
                                            className={tw("relative z-10 rounded-md bg-purple-700 px-3 py-1.5 font-medium text-gray-50")}
                                        >
                                            {deck.deckType.name}
                                        </motion.a>
                                    </div>
                                    <div className={tw("group relative")}>
                                        <h3 className={tw("mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600")}>
                                            <a href={deck.url} itemProp="url">
                                                <span className={tw("absolute inset-0")} />
                                                {deck.name}
                                            </a>
                                        </h3>
                                        <p className={tw("mt-5 text-sm leading-6 text-gray-600")}>{deck.description}</p>
                                    </div>
                                </div>
                            </motion.article>))}
                    </AnimatePresence>
                </div>
            </ReactShadowRoot>
        );
    }
}
