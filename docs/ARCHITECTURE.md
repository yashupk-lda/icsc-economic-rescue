# Architecture

The site has one reusable mission shell (`mission.html`) and shared design/runtime assets under `assets/`. Demand lessons live in `missions/`. The old `demand-N.html` paths are intentionally tiny redirects so existing bookmarks do not break.

`assets/js/engine.js` is the reusable interaction toolkit for new work: storage, shuffling, audio, feedback, confetti, and guided answer construction. The existing Demand mission modules preserve their mature custom interactions; as we touch them in future iterations, common code can be moved onto `EconEngine` without changing URLs or the shell.

This is deliberate progressive refactoring: the UI/shell/CSS are fully centralized now, while lesson-specific custom behavior remains isolated rather than risking a rewrite regression.
