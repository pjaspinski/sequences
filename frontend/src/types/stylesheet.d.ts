declare module '*.scss' {
	interface Stylesheet {
		[propertyKey: string]: string;
	}

	const stylesheet: Stylesheet;
	export = stylesheet;
}
