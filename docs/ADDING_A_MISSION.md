# Adding a mission later

1. Add mission metadata to `assets/js/mission-meta.js`.
2. Create `missions/<mission-id>.js`.
3. Add a mission card to the relevant unit map/menu.
4. Reuse the shell IDs and shared classes; do not copy CSS into the mission.
5. Use `localStorage` with a mission-specific key for prototype progress.
6. Run `node --check missions/<mission-id>.js` before committing.

## Design rules

- Dark mode is default; the learner can switch to light mode.
- Keep interactive choices large enough for touch.
- Use `.selected`, `.correct`, and `.wrong` states rather than inline colors.
- Tables must sit in an overflow container or remain usable on small screens.
- Teach intuition first, formal board language second.
- The page-specific “I don’t get it” explanation should be concrete and specific.
