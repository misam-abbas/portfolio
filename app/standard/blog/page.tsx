import type { Metadata } from "next";
import BlogList from "@/components/sections/blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on Next.js, AI engineering, and shipping production software.",
};

export default function BlogPage() {
  return (
    <div className="pt-32">
      <div className="container-portfolio pb-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Blog
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Writing on code &amp; product
          </h1>
          <p className="mt-4 text-white/60">
            Notes from building real production software — the parts that
            don&apos;t make it into the demo.
          </p>
        </div>

        <BlogList />
      </div>
    </div>
  );
}
