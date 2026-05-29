# 08_home_recent_projects_motion.md — HOME Recent Projects Motion Spec

## Scope

This document records the current HOME `Recent Projects` motion direction and the following `Brand Official` logo strip.

Preview file:

`/Users/tingyouzhao/Desktop/deaho官网/preview/home-news-motion-demo.html`

Preview URL while the local server is running:

`http://127.0.0.1:8765/preview/home-news-motion-demo.html`

---

## Design Intent

The `Recent Projects` section should feel like an editorial project reel for a premium championship brand.

It should not feel like:

- a normal blog grid
- a generic news card list
- an e-commerce product listing
- a dense corporate logo wall

The role of this section is to prove that DAEHO creates real championship objects connected to real teams, seasons, and moments.

---

## Previous Section To Recent Projects Transition

The transition starts from the previous HOME proof / bento section.

Desktop behavior:

- The previous bento remains visually pinned while the user scrolls.
- The bento darkens, slightly scales down, and moves upward a little.
- A warm white `Recent Projects` canvas pushes up from the bottom.
- The white canvas starts with soft rounded corners and a slight scale.
- As it settles, the canvas becomes full screen and the rounded corners disappear.
- The transition should feel like the next editorial page being pushed onto the stage, not like a normal section scroll.

Motion values used in the preview:

- Previous proof layer opacity fades down to roughly 12%.
- Previous proof layer scales down by roughly 7% to 10%.
- News canvas starts at about `104svh` below the viewport.
- News canvas scales from about `0.955` to `1`.
- News canvas border radius animates from about `34px` to `0`.
- Desktop transition uses a slower ease-in-out curve.

Mobile behavior:

- Mobile keeps the same visual idea but reduces the heavy pinned feeling.
- The white canvas enters earlier.
- The proof layer exits later so the two layers overlap for longer.
- This avoids black gaps during fast touch scrolling.

---

## Recent Projects Layout

Desktop:

- White / warm white background.
- Small centered title: `RECENT PROJECTS`.
- Three project visuals appear as a horizontal editorial reel.
- The rightmost card may be partially visible or treated as a next-project preview.
- Cards should have generous spacing and should not fill the section like a grid.
- Championship ring overlays float over the lower right of the cards.

Mobile:

- The project cards become a horizontal swipe reel.
- The first project is dominant.
- The second project peeks from the right to imply horizontal continuation.
- Scroll snap can be used, but the interaction should stay light.
- The card edge must not touch the viewport edge; keep a small left inset.

---

## Recent Projects Motion

Entry sequence:

1. `RECENT PROJECTS` fades and moves in first.
2. Project cards appear with a stagger.
3. Each card enters with slight upward movement and opacity reveal.
4. The ring overlays start floating after the cards are visible.
5. `VIEW MORE` appears after the project cards.
6. `BRAND OFFICIAL` appears after the project reel and button.

Recommended timing:

- Section title: about `900ms`.
- Project card reveal: about `980ms`.
- Project card stagger: roughly `140ms` between cards.
- `VIEW MORE`: after the last project card, about `720ms`.
- Ring floating loop: about `4.8s`, alternate direction.

Hover behavior:

- Hovering a project card slightly scales the image.
- The right grayscale preview card can become full color on hover.
- Ring overlays should not jump or bounce.
- Avoid neon glow, large zoom, or fast movement.

---

## View More Link

The section includes a `VIEW MORE` link button between the project reel and the `Brand Official` logo area.

Purpose:

- Lead users from the HOME preview into the full NEWS page.
- Keep the HOME section from becoming a full article archive.

Visual style:

- Center aligned.
- Thin pill outline.
- Small uppercase serif text.
- Low contrast by default.
- Slight border and text contrast increase on hover.
- Small plus mark moves subtly on hover.

Recommended route:

`/news`

---

## Brand Official Logo Strip

The logo area should behave like a slow proof strip, not a static corporate logo wall.

Desktop:

- Small centered title: `BRAND OFFICIAL`.
- Three marquee rows.
- Row 1 moves left.
- Row 2 moves right.
- Row 3 moves left.
- Movement should be very slow and quiet.
- Preview timing uses roughly `58s`, `68s`, and `78s` for the three rows.
- Logo color stays gray by default.
- Hovering the logo area pauses the rows.
- Hovering an individual logo makes it darker and moves it up slightly.

Mobile:

- Keep the marquee rows.
- Use shorter gaps and smaller logo widths.
- The logo area should remain visible in the lower part of the same white canvas.
- Avoid making the user scroll through a long logo wall.

---

## Technical Notes

The preview uses:

- CSS custom properties for scroll progress.
- A fixed visual scene for the desktop transition.
- A mobile-specific scroll curve so the white canvas appears earlier.
- `prefers-reduced-motion` fallback that removes pinned motion, marquee, and floating loops.

For production:

- This can be rebuilt with GSAP ScrollTrigger or a small requestAnimationFrame scroll handler.
- If GSAP is used, keep mobile behavior separate from desktop.
- Do not scrub every micro animation. Scrub only the section canvas transition; keep title/cards/button/logo reveals time-based once the section is active.
- Preserve the mobile overlap between proof and white canvas to avoid black gaps on fast touch scroll.
