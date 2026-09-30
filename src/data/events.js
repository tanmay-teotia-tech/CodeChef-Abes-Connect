// src/data/events.js
// All club events live here. Edit this file to update event data across the site.
// Date format: "YYYY-MM-DD"  |  Categories: Contest, Hackathon, Workshop, Seminar, Bootcamp

const events = [
  {
    id: 1,
    name: "Beginner DSA Bootcamp",
    date: "2026-10-05",
    time: "10:00 AM – 1:00 PM",
    venue: "Computer Lab 3, Block C",
    description:
      "A hands-on, 3-day bootcamp covering arrays, strings, linked lists and recursion from scratch. Perfect for students who have never solved a competitive programming problem before.",
    category: "Bootcamp",
    featured: false,
  },
  {
    id: 2,
    name: "Git & GitHub Workshop",
    date: "2026-10-12",
    time: "2:00 PM – 5:00 PM",
    venue: "Computer Lab 1, Block A",
    description:
      "Learn version control the right way — branching, pull requests, merge conflicts and open-source contribution workflows using real college project examples.",
    category: "Workshop",
    featured: false,
  },
  {
    id: 3,
    name: "Monthly Coding Contest — October",
    date: "2026-10-18",
    time: "11:00 AM – 2:00 PM",
    venue: "Computer Lab 4, Block C",
    description:
      "Our flagship monthly contest with 6 problems across easy, medium and hard difficulty. Prizes for top 3 finishers. Platform: CodeChef practice platform.",
    category: "Contest",
    featured: false,
  },
  {
    id: 4,
    name: "24-Hour Hackathon: HackABES",
    date: "2026-10-25",
    time: "9:00 AM (starts)",
    venue: "Auditorium & Innovation Lab",
    description:
      "Build a real product in 24 hours. Teams of 3–4. Themes announced at kickoff. Industry mentors available on-site. Best projects get certificates and goodies.",
    category: "Hackathon",
    featured: true,
  },
  {
    id: 5,
    name: "Web Development Workshop",
    date: "2026-11-02",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Hall, Block A",
    description:
      "Full-day workshop covering HTML, CSS, JavaScript and React basics. You will build and deploy a personal portfolio page by the end of the session.",
    category: "Workshop",
    featured: false,
  },
  {
    id: 6,
    name: "Bug Hunt — Debugging Challenge",
    date: "2026-11-15",
    time: "12:00 PM – 3:00 PM",
    venue: "Computer Lab 2, Block C",
    description:
      "Find and fix intentional bugs hidden across 10 short programs in C++, Python and Java. Tests your reading speed and logical reasoning. Open to all years.",
    category: "Contest",
    featured: false,
  },
  {
    id: 7,
    name: "AI & Career Talk by Industry Expert",
    date: "2026-11-22",
    time: "3:00 PM – 5:00 PM",
    venue: "Seminar Hall, Block B",
    description:
      "Guest talk by a senior engineer from a top product company on how AI is reshaping software roles, what skills matter in 2025, and how to stand out in campus placements.",
    category: "Seminar",
    featured: false,
  },
  {
    id: 8,
    name: "Competitive Programming Mock Contest",
    date: "2026-12-06",
    time: "10:00 AM – 1:00 PM",
    venue: "Computer Lab 4, Block C",
    description:
      "A timed mock contest modelled on Codeforces Div 2 format. Detailed editorial walkthrough session immediately after. Great practice before semester exams.",
    category: "Contest",
    featured: false,
  },
  {
    id: 9,
    name: "Placement Prep — DSA Marathon",
    date: "2026-12-20",
    time: "9:00 AM – 5:00 PM",
    venue: "Seminar Hall, Block A",
    description:
      "Full-day intensive session targeting placement-level DSA questions — trees, graphs, DP and system design basics. Peer review and group problem solving included.",
    category: "Bootcamp",
    featured: false,
  },
  {
    id: 10,
    name: "New Year Coding Sprint",
    date: "2027-01-10",
    time: "11:00 AM – 2:00 PM",
    venue: "Computer Lab 3, Block C",
    description:
      "Kick off 2027 with a fun sprint-style contest — 8 short problems, 3 hours, and a warm coding community. A great way to shake off holiday rust.",
    category: "Contest",
    featured: false,
  },
];

export default events;
