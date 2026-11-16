/**
 * THE source of truth for the portfolio's words.
 *
 * Everything here comes from Ishita's CV (resume_oct26.pdf) and public GitHub.
 * Fields set to `null` are unknown: fill them in rather than letting a
 * component invent them (components hide anything that is null). Edit this
 * file to update the site; no animation or layout code needs to change.
 *
 * Text marked "illustration" in project demos is demonstration material for
 * the interactive visuals, labelled as such on the page.
 */
import type {
  Beginning,
  Chapter,
  JourneyStop,
  Landing,
  Milestone,
  Next,
  Profile,
  Project,
  ToolGroup,
} from './types'

export const profile: Profile = {
  name: 'Ishita Singh',
  firstName: 'Ishita',
  location: 'Chennai, India',
  email: 'ishitasinghscs@gmail.com',
  links: {
    github: { label: 'GitHub', href: 'https://github.com/Ishita0325' },
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishita-singh' },
  },
  /** Set to a file in /public (e.g. '/Ishita-Singh-CV.pdf') to show a CV link. */
  cv: '/Ishita-Singh-CV.pdf',
}

export const landing: Landing = {
  greeting: "hi, I'm",
  intro:
    "I study computer science at SRM in Chennai, and I can't keep design out of the things I build.",
  invite: 'This is my patch of grass. Every doodle leads somewhere.',
  youAreHere: 'you are here',
  youAreHereAside: '(in my shoes)',
  stepForward: 'take a step',
  chalkOn: 'pick up the chalk',
  chalkOff: 'put the chalk down',
  chalkHint: 'drag across the grass',
  washAway: 'wash it away',
  lookAround: 'swipe to look around',
}

/**
 * Chapters of the journey, in reading order. Each one is anchored to a
 * doodle in the hero photograph, which links to it.
 */
export const chapters: Chapter[] = [
  {
    id: 'beginning',
    title: 'the beginning',
    teaser: 'who I am, and why I make things',
    doodle: 'flower-centre',
    intro: 'Where it starts: a student who likes making things look right and work right.',
  },
  {
    id: 'playground',
    title: 'the playground',
    teaser: "experiments and things I've built",
    doodle: 'spiral-teal',
    intro: 'Things I have built and am building, from a revision tool to hackathon apps.',
  },
  {
    id: 'journey',
    title: 'the journey',
    teaser: 'school, SRM and the clubs in between',
    doodle: 'flower-left',
    intro: 'The road so far: two school boards, one university, and a lot of club rooms.',
  },
  {
    id: 'milestones',
    title: 'the milestones',
    teaser: 'hackathons and small wins',
    doodle: 'star-big',
    intro: 'A few gold stars collected along the way.',
  },
  {
    id: 'toolkit',
    title: 'the toolkit',
    teaser: 'what I build with',
    doodle: 'flower-green',
    intro: 'Pick up a stick of chalk to see where I have used it.',
  },
  {
    id: 'next',
    title: "what's next",
    teaser: "where I'm headed",
    doodle: 'spiral-sun',
    intro: 'Looking a little further down the path.',
  },
]

export const beginning: Beginning = {
  /**
   * The statement is split so components can draw chalk marks around the
   * highlighted words without the copy living in component code.
   */
  statement: [
    { text: "I'm an engineering student with a soft spot for " },
    { text: 'design and editing', mark: 'circle' },
    { text: ', and I keep looking for ways to put both into ' },
    { text: 'real projects', mark: 'underline' },
    { text: '.' },
  ],
  paragraphs: [
    "I'm studying for a B.Tech in Computer Science at SRM Institute of Science and Technology in Chennai. Alongside the code I'm drawn to design and editing, and my favourite projects are the ones where I get to do both.",
    'I like building with other people, picking up new tools, and sweating the details until an idea turns into something that actually works.',
  ],
  facts: [
    { label: 'Based in', value: 'Chennai, India' },
    { label: 'Studying', value: 'B.Tech Computer Science, SRM IST' },
    { label: 'CGPA', value: '9.73 / 10' },
    { label: 'Writes', value: 'C++, C, Python' },
  ],
}

export const projects: Project[] = [
  {
    id: 'quiz-generator',
    name: 'Quiz Generator',
    problem: 'Turning class notes into revision material takes students and teachers a lot of time.',
    built: 'A website that turns class notes into quizzes and exams.',
    tools: ['HTML', 'JavaScript', 'CSS', 'HuggingFace APIs', 'Python'],
    context: null,
    status: 'built',
    contribution: null,
    outcome: null,
    repo: null,
    live: null,
    demo: {
      kind: 'quiz',
      notes:
        'Photosynthesis happens in the chloroplasts. Plants use sunlight, water and carbon dioxide to make glucose, and release oxygen.',
      question: 'Which gas do plants release during photosynthesis?',
      options: ['Carbon dioxide', 'Oxygen', 'Nitrogen'],
      answer: 1,
    },
  },
  {
    id: 'health-predictor',
    name: 'AI Critical Health Predictor',
    problem: 'Medical staff need to know quickly which patients are the most critical.',
    built: 'A machine-learning model, trained on synthetic data, that predicts how critical a patient is from their symptoms.',
    tools: ['scikit-learn', 'Streamlit', 'Python', 'Google Colab'],
    context: null,
    status: 'built',
    contribution: null,
    outcome: null,
    repo: null,
    live: null,
    demo: {
      kind: 'health',
      symptoms: [
        { label: 'High fever', weight: 2 },
        { label: 'Low oxygen', weight: 4 },
        { label: 'Chest pain', weight: 3 },
        { label: 'Racing pulse', weight: 2 },
        { label: 'Confusion', weight: 3 },
      ],
      levels: ['stable', 'watch closely', 'critical'],
    },
  },
  {
    id: 'tourist-safety',
    name: 'Smart Tourist Safety App',
    problem:
      'Tourists in high-risk scenic zones need a fast way to reach the authorities during accidents or natural disasters.',
    built: "An application that tracks tourists' locations in risky zones and connects them with the authorities.",
    tools: [
      'React',
      'TailwindCSS',
      'Python',
      'FastAPI',
      'Supabase PostgreSQL',
      'Supabase Realtime',
      'OpenStreetMap',
      'Geolocation API',
      'Vercel',
    ],
    context: 'Smart India Hackathon 2025',
    status: 'built',
    contribution: null,
    outcome: null,
    repo: null,
    live: null,
    demo: { kind: 'map', action: 'send an alert' },
  },
  {
    id: 'railway-maintenance',
    name: 'Smart Railway Maintenance Management App',
    problem:
      'Railway maintenance departments that work in silos lose efficiency, which shows up as train delays and disrupted passengers.',
    built: 'An application to coordinate every railway maintenance department in one place.',
    tools: ['React', 'TailwindCSS', 'Python', 'FastAPI', 'Supabase PostgreSQL'],
    context: 'Smart India Hackathon 2026',
    status: 'in progress',
    contribution: null,
    outcome: null,
    repo: null,
    live: null,
    demo: {
      kind: 'rail',
      departments: ['Track', 'Signals', 'Electrical', 'Rolling stock'],
    },
  },
]

/** Education and clubs, oldest first. */
export const journey: JourneyStop[] = [
  {
    when: '2022',
    title: 'Class X',
    place: 'Sri Chaitanya Techno School, CBSE',
    detail: 'Finished with 92.4%.',
  },
  {
    when: '2024',
    title: 'Class XII',
    place: 'New Times International School, CBSE',
    detail: 'Finished with 84.2%.',
  },
  {
    when: '2024',
    title: 'B.Tech, Computer Science',
    place: 'SRM Institute of Science and Technology',
    detail: 'Started the degree; holding a 9.73 / 10 CGPA so far.',
  },
  {
    when: 'Aug 2024',
    title: 'Technical Team Member, CHiPSET',
    place: 'SRMIST Ramapuram, Chennai',
    detail: 'Hosting technical events for other students:',
    list: [
      'RenderScape: making projects in Figma and Blender',
      'VibeX: using AI to build coding projects',
      'Cloud9: an introduction to Google Cloud labs and skills',
    ],
  },
  {
    when: '2025',
    title: 'Delegation Member, MUN Club',
    place: 'SRMIST Ramapuram, Chennai',
    detail: 'Debating in the Human Rights Committee:',
    list: ['MOPMUN25, as the delegate of Qatar', 'SRMVMUN25, as the delegate of Sri Lanka'],
  },
]

export const milestones: Milestone[] = [
  {
    id: 'leetcode',
    title: 'Most Consistent LeetCode Problem Solver',
    detail: 'Awarded by CHiPSET.',
    when: '2025',
    star: 'gold',
  },
  {
    id: 'sih-2025',
    title: 'Smart India Hackathon 2025',
    detail: 'Built the Smart Tourist Safety App.',
    when: '2025',
    star: 'red',
  },
  {
    id: 'cgpa',
    title: '9.73 CGPA',
    detail: 'In B.Tech Computer Science at SRM IST.',
    when: 'so far',
    star: 'yellow',
  },
  {
    id: 'events',
    title: 'Three technical events hosted',
    detail: 'RenderScape, VibeX and Cloud9, for CHiPSET.',
    when: '2024 – now',
    star: 'blue',
  },
  {
    id: 'sih-2026',
    title: 'Smart India Hackathon 2026',
    detail: 'Building the Smart Railway Maintenance Management App.',
    when: 'in progress',
    star: 'outline',
  },
]

/**
 * Tools grouped as chalk sticks. `usedIn` names the projects (by id) or
 * events where a tool appears on the CV; leave it empty when the CV only
 * lists the tool as a skill.
 */
export const toolkit: ToolGroup[] = [
  {
    name: 'Languages',
    ink: 'sun',
    tools: [
      { name: 'Python', usedIn: ['quiz-generator', 'health-predictor', 'tourist-safety', 'railway-maintenance'] },
      { name: 'C++', usedIn: [] },
      { name: 'C', usedIn: [] },
    ],
  },
  {
    name: 'The web',
    ink: 'teal',
    tools: [
      { name: 'React', usedIn: ['tourist-safety', 'railway-maintenance'] },
      { name: 'TailwindCSS', usedIn: ['tourist-safety', 'railway-maintenance'] },
      { name: 'JavaScript', usedIn: ['quiz-generator'] },
      { name: 'HTML', usedIn: ['quiz-generator'] },
      { name: 'CSS', usedIn: ['quiz-generator'] },
    ],
  },
  {
    name: 'Backend and data',
    ink: 'coral',
    tools: [
      { name: 'FastAPI', usedIn: ['tourist-safety', 'railway-maintenance'] },
      { name: 'Supabase PostgreSQL', usedIn: ['tourist-safety', 'railway-maintenance'] },
      { name: 'Supabase Realtime', usedIn: ['tourist-safety'] },
    ],
  },
  {
    name: 'Machine learning',
    ink: 'lime',
    tools: [
      { name: 'scikit-learn', usedIn: ['health-predictor'] },
      { name: 'HuggingFace APIs', usedIn: ['quiz-generator'] },
      { name: 'Streamlit', usedIn: ['health-predictor'] },
      { name: 'Google Colab', usedIn: ['health-predictor'] },
    ],
  },
  {
    name: 'Maps and shipping',
    ink: 'pink',
    tools: [
      { name: 'OpenStreetMap', usedIn: ['tourist-safety'] },
      { name: 'Geolocation API', usedIn: ['tourist-safety'] },
      { name: 'Vercel', usedIn: ['tourist-safety'] },
    ],
  },
  {
    name: 'Design',
    ink: 'chalk',
    tools: [
      { name: 'Figma', usedIn: ['renderscape'] },
      { name: 'Blender', usedIn: ['renderscape'] },
    ],
  },
]

/** Places a tool can point to besides projects. */
export const toolPlaces: { id: string; name: string }[] = [
  { id: 'renderscape', name: 'RenderScape (an event I hosted)' },
]

export const next: Next = {
  now: [
    'Building the Smart Railway Maintenance Management App for Smart India Hackathon 2026.',
    'Studying Computer Science at SRM.',
    'Hosting technical events with CHiPSET.',
  ],
  /** Ambitions in Ishita's own words; hidden while null. */
  ambition: null,
  invite: 'Want to build something together, or just say hi?',
  copy: 'copy',
  copied: 'copied',
  copyFailed: 'copy failed',
  closing: 'See you on the grass.',
}

export const footer = {
  line: 'Made by Ishita Singh with chalk, grass and a lot of React.',
  backToTop: 'back to the grass',
}
