# Ishita Singh: in my shoes

A personal portfolio built as a small world. You start looking down at a pair of shoes on chalk-doodled grass; each doodle leads to a chapter of the story.

**Chapters:** the beginning, the playground (projects), the journey (education and clubs), the milestones, the toolkit, and what's next.

## Run it

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # type-checks, then builds to dist/
```

## Edit the content

All words live in one file: [`src/content/portfolio.ts`](src/content/portfolio.ts) (shapes in `types.ts`). No layout or animation code needs to change when you:

- add or edit a project (`projects`); fill `contribution`, `outcome`, `repo` or `live` and they appear automatically (they stay hidden while `null`),
- add a journey stop, milestone or tool (`journey`, `milestones`, `toolkit`),
- write your ambitions (`next.ambition`, hidden while `null`),
- swap the CV (`public/Ishita-Singh-CV.pdf`, or set `profile.cv` to `null` to hide the link).

## How it's put together

- `src/landing/`: the hero world. `world.ts` holds the positions of the 25 chalk doodles cut out of the hero photo (`public/world/doodles/`), so they can light up, react to the cursor and act as links.
- `src/chapters/`: one component and stylesheet per chapter; `playground/demos.tsx` holds the interactive project illustrations.
- `src/motion/`: a single shared animation loop, the smoothed pointer, and in-view/reduced-motion hooks.
- `src/ui/`: the doodle trail navigation, chapter heads and hand-drawn chalk marks.

Respects `prefers-reduced-motion`, works with touch (swipe the hero to look around, draw with the chalk) and keyboard.

Source photographs are in `is-upscale/`; optimised AVIF/WebP versions are in `public/world/`.
