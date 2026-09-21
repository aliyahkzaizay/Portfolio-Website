export const projects = {
  "ceo": {
    "title": "C.E.O. Dashboard",
    "kind": "Full-stack · In progress",
    "description": "A club operations dashboard for attendance, events, and member data.",
    "tech": "React • Node.js • Python",
    "link": "https://github.com/aliyahkzaizay/C.E.O-Dashboard",
    "notes": "Building member and event data models, Google Sheets check-in syncing, and attendance analytics for student organization leaders.",
    "image": ""
  },
  "dorms": {
    "title": "RPIDorms",
    "kind": "Open source · Housing platform",
    "description": "A responsive dorm map with search and filters for location and class year.",
    "tech": "React • JavaScript • Leaflet • JSON",
    "link": "https://github.com/sjoasil001/rpi-dorms",
    "notes": "Contributed reusable features and collaborated through code reviews on an open-source housing platform serving 1,000+ students.",
    "image": "assets/project-previews/dorms-preview.png"
  },
  "nsh": {
    "title": "NSH @ RPI 2027",
    "kind": "Event website · Ongoing",
    "description": "A hackathon website with schedules, rules, registration information, and participant resources.",
    "tech": "React • JavaScript • Netlify",
    "link": "",
    "notes": "Built and deployed the event site. Working with NSBE and SHPE organizers to keep information clear and up to date.",
    "image": ""
  },
  "pulse": {
    "title": "PULSE NYC",
    "kind": "Frontend · Marketing website",
    "description": "A landing page for an early-stage NYC nightlife discovery product.",
    "tech": "React • TypeScript • Vite • Tailwind CSS • Vercel",
    "link": "https://github.com/aliyahkzaizay/pulse-nyc-website",
    "notes": "The marketing website introduces the product and its nightlife discovery concept.",
    "image": ""
  },
  "os": {
    "title": "OSChooser",
    "kind": "UX research · Data visualization",
    "description": "An interactive data visualization prototype designed to help users compare iOS and Windows systems based on preferences, security concerns, integration, and industry usage. The project includes user testing, survey analysis, and iterative design revisions informed by participant feedback.",
    "tech": "UX Research • Prototyping • Figma",
    "link": "https://www.figma.com/proto/TsSgX8HwgqTD6P6nhNa91j/WebPage-IDV?node-id=7-109&starting-point-node-id=7%3A109&t=D8fcSJFGAVHnryrU-1",
    "notes": "The process includes user testing, survey analysis, and iterative design revisions based on participant feedback. Compare operating systems through preferences, security, integration, and industry usage.",
    "image": "assets/project-previews/os-preview.jpg"
  }
};

export const playlists = { dev: ["ceo", "dorms", "nsh", "pulse"], design: ["os"] };
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
