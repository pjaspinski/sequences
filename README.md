# sequences

<div align="center">
    <img src="/logos/light-logo-bg.svg">
</div>

## Fonts without access to Google Fonts

Right now there is no way to make Semantic UI use fonts that are locally hosted. A good alternative is using Fomantic UI's CSS instead (just install `fomantic-ui-css` and replace import path in `index.tsx`), but only after version 2.9.0 is released, because of these two issues:

-   https://github.com/fomantic/Fomantic-UI/issues/2379
-   https://github.com/fomantic/Fomantic-UI/pull/2359

For now, I am using CSS file from `semantic-ui-offline` with some additional fixes that I made on my fork (and maybe it's good to leave it this way if nothing breaks).
