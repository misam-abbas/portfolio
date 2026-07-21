import { Github, GitFork, Star, Users } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { getGithubStats, getPinnedRepos } from "@/lib/github";
import { env } from "@/lib/env";

export default async function GithubActivity() {
  const [stats, repos] = await Promise.all([getGithubStats(), getPinnedRepos(6)]);
  const username = env.GITHUB_USERNAME ?? "misam-abbas";

  const statCards = [
    { label: "Public repos", value: stats?.publicRepos ?? "—", icon: Github },
    { label: "Followers", value: stats?.followers ?? "—", icon: Users },
    { label: "Total stars", value: stats?.totalStars ?? "—", icon: Star },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="GitHub"
          title="Recent activity"
          description="Live data pulled straight from GitHub."
        />

        <div className="mb-10 grid grid-cols-3 gap-2 sm:gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-3 text-center sm:p-5">
              <s.icon className="mx-auto mb-2 h-4 w-4 text-[var(--color-cyan)] sm:h-5 sm:w-5" />
              <p className="font-display text-lg font-bold text-white sm:text-2xl">{s.value}</p>
              <p className="mt-1 text-[10px] text-white/50 sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="glass mb-10 overflow-x-auto rounded-2xl p-4 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/e0997c/${username}`}
            alt={`${username} GitHub contribution graph`}
            className="mx-auto h-auto w-full max-w-[640px]"
            loading="lazy"
          />
        </div>

        {repos.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="glass glow-border rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="min-w-0 truncate font-mono text-sm text-white">{repo.name}</p>
                  {repo.language && (
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
                      {repo.language}
                    </span>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-white/50">
                  {repo.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {repo.forks}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {!stats && (
          <p className="text-center text-sm text-white/40">
            Connect a GITHUB_USERNAME and GITHUB_TOKEN in your environment to
            show live GitHub data here.
          </p>
        )}
      </div>
    </section>
  );
}
