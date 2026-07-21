import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getBlogPost } from "@/content/blog/posts";
import { formatDate, readingTime } from "@/lib/utils";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="pt-32">
      <div className="container-portfolio max-w-3xl pb-24">
        <Link
          href="/standard/blog"
          data-cursor-hover
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>

        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          {post.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-white/40">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{readingTime(post.content)}</span>
        </div>

        <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-3xl">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-invert mt-10 max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5 leading-relaxed text-white/75">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/50"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
