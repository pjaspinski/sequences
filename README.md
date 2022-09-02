# sequences

<div align="center">
    <img src="/logos/light-logo-bg.svg">
</div>

## Requirements

-   Node.js v16.14.0 (it does not work on 16.17.0 for some mysterious reason)

## Development

### Correct linking setup

Right now the best way to develop all 3 packages simultaneously (sequences, sequences-types and sequences-plugin-vmix) it to link them all together.
How to do it?

1. Go to sequences-types package directory and type `npm link`.
2. Go to sequences-plugin-vmix package directory and type `npm link`.
3. Go to sequences/backend directory and type `npm link sequences-types sequences-plugin-vmix`.
4. Go to sequences-plugin-vmix package directory and type `npm link sequences-types`.
   <!-- break -->
   I know, this setup is crazy, I will think about how to make it better!

## Fonts without access to Google Fonts

Right now there is no way to make Semantic UI use fonts that are locally hosted. A good alternative is using Fomantic UI's CSS instead (just install `fomantic-ui-css` and replace import path in `index.tsx`), but only after version 2.9.0 is released, because of these two issues:

-   https://github.com/fomantic/Fomantic-UI/issues/2379
-   https://github.com/fomantic/Fomantic-UI/pull/2359

For now, I am using CSS file from `semantic-ui-offline` with some additional fixes that I made on my fork (and maybe it's good to leave it this way if nothing breaks).
