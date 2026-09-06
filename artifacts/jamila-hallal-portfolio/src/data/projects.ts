export type Project = {
  id: string;
  title: string;
  label: string;
  year: string;
  summary: string;
  detail: string;
  outcome: string;
  tags: string[];
  accent: string;
  liveUrl?: string;
};

// Add future work here. The projects section reads this structure automatically.
export const projects: Project[] = [
  {
    id: "lebanongen",
    title: "LebanonGen",
    label: "Machine learning health platform",
    year: "2026",
    summary: "A full-stack genetic health platform for risk assessment and public education.",
    detail: "Users can enter genetic information and receive machine learning-based predictions for sickle cell anemia risk in potential offspring. The platform also includes a real-time Groq chatbot, an interactive Lebanon prevalence map, anonymized aggregated data, and separate Administrator, Researcher, and Doctor roles.",
    outcome: "A privacy-aware public-interest platform that makes sensitive genetic information easier to understand.",
    tags: ["Full-stack", "React", "AI", "MySQL", "Flask"],
    accent: "coral",
    liveUrl: "https://lebanon-gen.vercel.app/",
  },
  {
    id: "hasbani",
    title: "Hasbani",
    label: "Nature’s Taste e-commerce platform",
    year: "2026",
    summary: "A full-stack digital storefront and admin dashboard for a Lebanese food brand.",
    detail: "Built a public product experience with an admin dashboard that gives the team full control over product listings, categories, descriptions, and images. The system supports add, edit, and delete workflows without requiring end-user login.",
    outcome: "A practical commerce platform that lets a local brand manage its own catalogue confidently.",
    tags: ["Full-stack", "React", "Node.js", "MySQL", "Admin"],
    accent: "teal",
    liveUrl: "https://hasbani-lb.com/",
  },
];