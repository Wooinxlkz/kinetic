export type Testimonial = {
  id: string;
  name: string;
  handle: string;
  /** Local avatar from /public/avatars/ — hand-drawn Notion-style illustration. */
  avatar: string;
  verified: boolean;
  content: string;
};

// Avatars live in /public/avatars/ — 16 unique hand-drawn illustrations,
// one per testimonial. Add new files as avatar-17.png etc. to extend.
const A = (n: number) => `/avatars/avatar-${String(n).padStart(2, "0")}.png`;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Alex Chen",
    handle: "alexcdev",
    avatar: A(1),
    verified: true,
    content:
      "Finally a component library that doesn't feel like homework to integrate. Kinetic UI's motion primitives are exactly what I wanted — zero config, production-ready out of the box.",
  },
  {
    id: "2",
    name: "Sara Lim",
    handle: "saralim_ui",
    avatar: A(2),
    verified: false,
    content:
      "Pasted the tilt card into my portfolio and my DMs tripled. The micro-interactions are genuinely top tier.",
  },
  {
    id: "3",
    name: "Jordan M",
    handle: "jrdnbuilds",
    avatar: A(3),
    verified: false,
    content:
      "Dropped my custom Framer Motion setup for Kinetic UI. Killed ~400 lines from our design system and the animations are actually *better* now.",
  },
  {
    id: "4",
    name: "Priya R",
    handle: "priyabuilds",
    avatar: A(4),
    verified: true,
    content:
      "The view transition theme toggle alone is worth the install. First time I've seen that done this cleanly in any library.",
  },
  {
    id: "5",
    name: "Dmitri V",
    handle: "dvlpr_d",
    avatar: A(5),
    verified: false,
    content:
      "Been a Framer Motion power user for years. This is what shadcn + FM should've been from day one.",
  },
  {
    id: "6",
    name: "Marcus T",
    handle: "mtdesigns",
    avatar: A(6),
    verified: true,
    content:
      "The marquee component alone saved me an entire afternoon. Used to write this from scratch every single project.",
  },
  {
    id: "7",
    name: "Yuki H",
    handle: "yukihdev",
    avatar: A(7),
    verified: false,
    content:
      "Kinetic UI is the reason I stopped dreading the \u201cadd some animations\u201d comment in PRs. Just copy, paste, done.",
  },
  {
    id: "8",
    name: "Chloe B",
    handle: "chloebuilds",
    avatar: A(8),
    verified: false,
    content:
      "Copy-paste motion components that actually look like someone cared about them. Rare. Extremely rare.",
  },
  {
    id: "9",
    name: "Theo K",
    handle: "theo_kdev",
    avatar: A(9),
    verified: true,
    content:
      "Shipped a landing page in a day using only Kinetic UI. Client asked who did the animations. I said me. I'm a backend dev.",
  },
  {
    id: "10",
    name: "Rafa S",
    handle: "rafaelsc",
    avatar: A(10),
    verified: false,
    content:
      "The TypeScript types on these components are unmatched. No more 'string | undefined' animation disasters at 2am.",
  },
  {
    id: "11",
    name: "Mia C",
    handle: "miacodes",
    avatar: A(11),
    verified: false,
    content:
      "Finally found a reason to actually use view transitions in production. That theme toggle is \uD83D\uDD25",
  },
  {
    id: "12",
    name: "Ben O",
    handle: "benov_dev",
    avatar: A(12),
    verified: true,
    content:
      "Used this for a client project. They thought I hired a motion designer. I did not.",
  },
  {
    id: "13",
    name: "Ana P",
    handle: "anapdesign",
    avatar: A(13),
    verified: false,
    content:
      "The button micro-interactions are *chef's kiss*. Subtle but makes everything feel premium. My clients love it.",
  },
  {
    id: "14",
    name: "James L",
    handle: "jlcode",
    avatar: A(14),
    verified: false,
    content:
      "Tried to rebuild the action icons from scratch to learn Framer Motion. Gave up after 2 hours and just used Kinetic UI. 10/10 no regrets.",
  },
  {
    id: "15",
    name: "Lena M",
    handle: "lenamotion",
    avatar: A(15),
    verified: true,
    content:
      "I've used magic-ui, aceternity, framer. Kinetic UI is the only one I'd ship in production without tweaking half the source code first.",
  },
  {
    id: "16",
    name: "Kai N",
    handle: "kainvdev",
    avatar: A(16),
    verified: false,
    content:
      "Clean docs. Working components. Animations that don't lag. A trifecta I genuinely didn't think was possible in an open-source library.",
  },
];
