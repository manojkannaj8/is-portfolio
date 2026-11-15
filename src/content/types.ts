/**
 * Shapes for everything the portfolio says.
 * Content lives in ./portfolio.ts; components only read it.
 */

export type ChapterId = 'beginning' | 'playground' | 'journey' | 'milestones' | 'toolkit' | 'next'

/** Chalk doodles in the hero photograph that act as doors to chapters. */
export type DoodleId =
  | 'flower-centre'
  | 'spiral-teal'
  | 'flower-left'
  | 'star-big'
  | 'flower-green'
  | 'spiral-sun'

export type Ink = 'sun' | 'coral' | 'teal' | 'pink' | 'lime' | 'chalk'

export interface Link {
  label: string
  href: string
}

export interface Profile {
  name: string
  firstName: string
  location: string
  email: string
  links: { github: Link; linkedin: Link }
  cv: string | null
}

export interface Landing {
  greeting: string
  intro: string
  invite: string
  youAreHere: string
  youAreHereAside: string
  stepForward: string
  chalkOn: string
  chalkOff: string
  chalkHint: string
  washAway: string
  lookAround: string
}

export interface Chapter {
  id: ChapterId
  title: string
  /** One short line shown when its doodle is hovered. */
  teaser: string
  doodle: DoodleId
  /** One line under the chapter title. */
  intro: string
}

export interface Beginning {
  statement: { text: string; mark?: 'circle' | 'underline' }[]
  paragraphs: string[]
  facts: { label: string; value: string }[]
}

export type ProjectDemo =
  | { kind: 'quiz'; notes: string; question: string; options: string[]; answer: number }
  | { kind: 'health'; symptoms: { label: string; weight: number }[]; levels: [string, string, string] }
  | { kind: 'map'; action: string }
  | { kind: 'rail'; departments: string[] }

export interface Project {
  id: string
  name: string
  problem: string
  built: string
  tools: string[]
  context: string | null
  status: 'built' | 'in progress'
  /** Fill in when known; hidden while null, never invented. */
  contribution: string | null
  outcome: string | null
  repo: string | null
  live: string | null
  demo: ProjectDemo
}

export interface JourneyStop {
  when: string
  title: string
  place: string
  detail: string
  list?: string[]
}

export interface Milestone {
  id: string
  title: string
  detail: string
  when: string
  star: 'gold' | 'red' | 'yellow' | 'blue' | 'outline'
}

export interface ToolGroup {
  name: string
  ink: Ink
  tools: { name: string; usedIn: string[] }[]
}

export interface Next {
  now: string[]
  ambition: string | null
  invite: string
  closing: string
}
