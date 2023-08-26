import React, { Component } from 'react'; // we need this to make JSX compile

import { cssom, twind } from "@twind/core";
import config from '../twind.config';

import { motion } from "framer-motion"

// Use sheet and config to create an twind instance. `tw` will
// append the right CSS to our custom stylesheet.
export const cardsheet = cssom(new CSSStyleSheet());
const tw2 = twind(config, cardsheet);


interface EtteillaCardProps {
    model: {
        id: string
        name: string
        url: string
        title: string
        images?: {
            base: string
            webp: string
            avif: string
            jpeg: string
        }
        decks: number
    }
}

export class EtteillaCard extends Component<EtteillaCardProps> {

    constructor(props: EtteillaCardProps) {
        super(props);
    }


    override render() {
        return (
            <motion.li
                initial={{ y:30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                
                whileHover={{
                    translateY: -2,
                    transition: { duration: 0.2 },
                  }}
                key={this.props.model.name + this.props.model.id}
                className={tw2("drop-shadow-lg hover:drop-shadow-2xl hover:cursor-pointer")}>
                <a href={this.props.model.url}>
                    <span className={tw2("absolute left-2 top-2 inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-gray-900")}>
                        {this.props.model.decks} deck{this.props.model.decks > 1 && "s"}
                    </span>
                    <div className={tw2("group aspect-square block w-full overflow-hidden rounded-lg bg-zinc-900 mix-blend-overlay relative")}>
                        {this.props.model.images &&
                            <picture>
                                <source
                                    type="image/webp"
                                    srcSet={this.props.model.images.webp}
                                    sizes="(max-width: 768px) 100vw, 33vw" />
                                <source
                                    type="image/avif"
                                    srcSet={this.props.model.images.avif}
                                    sizes="(max-width: 768px) 100vw, 33vw" />
                                <img
                                    itemProp="contentUrl" alt={this.props.model.name} decoding="auto" loading="eager" width="280" height="280"
                                    src={this.props.model.images.base} sizes="(max-width: 768px) 100vw, 33vw"
                                    srcSet={this.props.model.images.jpeg}
                                    className={tw2("object-cover object-center w-full")} />
                            </picture>
                        }
                        <div className={tw2("absolute left-0 top-0 bottom-0 right-0 bg-gradient-to-b from-transparent to-black")} />
                    </div>
                    <h2 className={tw2("absolute left-2 bottom-2 right-2 pointer-events-none mt-2 block truncate text-center font-medium text-gray-50")}>{this.props.model.name}</h2>
                </a>
                </motion.li>
        );
    }

}

