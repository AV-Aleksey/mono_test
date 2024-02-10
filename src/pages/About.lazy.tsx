import {FC, lazy} from "react";


export const AboutLazy = lazy(() => {
    return import('./About')
});