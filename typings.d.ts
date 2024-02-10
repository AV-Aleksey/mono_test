declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames
}

declare const __PLATFORM__: 'mobile' | 'desktop';