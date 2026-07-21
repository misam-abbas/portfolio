"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { BLOG_POSTS, getAllCategories } from "@/content/blog/posts";
import { formatDate, readingTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function BlogList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const categories = useMemo(() => ["all", ...getAllCategories()], []);

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === "all" || post.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 sm:max-w-xs">
          <Search className="h-4 w-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/40 sm:text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              data-cursor-hover
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                category === c
                  ? "border-transparent bg-gradient-to-r from-[var(--color-purple)] to-[var(--color-cyan)] text-white"
                  : "border-white/10 text-white/50 hover:text-white"
              )}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/40">
          No articles match your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="h-full"
            >
              <Link
                href={`/standard/blog/${post.slug}`}
                data-cursor-hover
                className="glass glow-border group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span>{readingTime(post.content)}</span>
                  </div>
                  <h2 className="mt-2 font-display text-base font-semibold text-white">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-white/55">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
