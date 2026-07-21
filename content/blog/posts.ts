import type { BlogPost } from "@/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "recreating-a-premium-landing-page-in-webflow",
    title: "What I Learned Recreating a Premium Landing Page in Webflow",
    excerpt:
      "Notes from rebuilding the WonderFlow landing page pixel-by-pixel — spacing systems, interactions, and the small details that make a design feel expensive.",
    category: "Webflow",
    tags: ["Webflow", "UI Design", "Responsive Design"],
    publishedAt: "2025-11-02",
    coverImage: "/images/blog/webflow-clone-notes.svg",
    content: `Cloning a landing page sounds easy until you actually try to match it exactly. The layout is the easy 20%. The other 80% is spacing rhythm, type scale, and the tiny interaction timings that most people never consciously notice but immediately feel when they're missing.

Building a component-driven class system in Webflow, instead of one-off styles per section, made the biggest difference. Once the spacing scale and type styles were defined as reusable classes, matching the original design became a lot more mechanical and a lot less guesswork.

The other lesson was about interactions. It's tempting to add movement everywhere, but the original design used motion sparingly — a fade here, a subtle parallax there — which is part of why it reads as premium instead of busy. Restraint turned out to be the actual skill being practiced, not the animation itself.`,
  },
  {
    slug: "building-a-student-result-management-system",
    title: "Building a Student Result Management System with Laravel",
    excerpt:
      "How I structured the database and auth for a full-stack academic dashboard where admins manage results and students view their own performance.",
    category: "Laravel",
    tags: ["Laravel", "PHP", "MySQL", "Authentication"],
    publishedAt: "2025-09-18",
    coverImage: "/images/blog/student-management-notes.svg",
    content: `The interesting part of this project wasn't the CRUD screens — Laravel makes those fast. It was getting the data model right before writing any UI at all.

Students, subjects, and results all relate to each other in ways that are easy to get wrong early and painful to fix later. Modeling those relationships clearly with Eloquent from the start meant the admin dashboard and the student-facing views could both query the same clean data without duplicating logic.

Role-based authentication was the other core piece: admins needed full access to manage records, while students needed a narrow, read-only view of just their own results. Keeping that boundary enforced at the query layer, not just hidden in the UI, was the difference between a demo and something that actually behaves securely.`,
  },
  {
    slug: "why-i-build-clones-to-get-better",
    title: "Why I Build Clones to Get Better at Web Design",
    excerpt:
      "Recreating existing interfaces — like a Webflow Conference landing page — is one of the fastest ways to actually notice design decisions instead of skimming past them.",
    category: "Learning",
    tags: ["Webflow", "UI/UX", "Practice"],
    publishedAt: "2025-08-05",
    coverImage: "/images/blog/why-clones-notes.svg",
    content: `It's easy to look at a great landing page and nod along — "yeah, that's clean." It's much harder to actually explain why it works until you try to rebuild it yourself.

Recreating the Webflow Conference landing page forced me to notice things I would have scrolled past otherwise: how much whitespace sits between a headline and its subtext, how a button's hover state is timed, why a hero section uses one bold weight instead of three competing ones.

Clones aren't about copying someone else's work to claim as original — they're deliberate practice. Each one leaves me with a slightly sharper eye for hierarchy, spacing, and restraint, which shows up in the projects that actually are mine.`,
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllCategories() {
  return Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
}
