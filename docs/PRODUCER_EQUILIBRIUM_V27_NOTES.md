# Producer's Equilibrium v27 deep-pass notes

This is an additive deep pass over v26.

## Holes fixed
- Corrected the two-intersection MR-MC visual so the first crossing is MC from above and the second crossing is MC from below.
- Added a row-by-row marginal decision table before formal equilibrium language.
- Added a numerical before/at/after equilibrium table so the second condition is understood before memorised.
- Added why TR begins at the origin while TC begins on the Y-axis at TFC.
- Added the equal-slope / parallel-tangent interpretation of the maximum TR-TC gap.
- Numerically connected changes in TR and TC to MR and MC.
- Added break-even (AR=AC).
- Fixed the incomplete loss treatment by adding AVC and the short-run shutdown rule.
- Added a clear curriculum boundary between Producer's Equilibrium and the separate Perfect Competition Equilibrium chapter.
- Added examiner-error repair, graph-construction checklist, loss/shutdown application, and another mixed school-paper case.

## Validation
- producer-1.js through producer-4.js pass node --check.
- mission-meta.js and mission-loader.js pass node --check.
- All 65 producer-equilibrium screens have render handlers.
- Mocked runtime initialization passed on all 65 screens.
- Local HTML href/src reference check passed.

## Sources
See docs/PRODUCER_EQUILIBRIUM_SOURCES.md.
