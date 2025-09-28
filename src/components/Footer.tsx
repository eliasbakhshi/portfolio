/* eslint-disable react/display-name */
"use client";
import React, { JSX } from "react";

export default function Footer({ text }: { text: React.ReactNode }): JSX.Element {

    return (
        <footer>
            <div className='container mx-auto pb-6 nav-section px-4 md:px-0'>
                <p className='text-sm text-secondary-faded'>{text}</p>
            </div>
        </footer>
    );
}
