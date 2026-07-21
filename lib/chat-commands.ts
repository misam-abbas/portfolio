import type { ChatMessageKind } from "@/types";

export interface SlashCommand {
  command: string;
  description: string;
  kind: ChatMessageKind;
  /** Fallback plain-text summary shown above the rich block, and used if rendered outside the chat (e.g. copied). */
  summary: string;
}

// NOTE: /experience, /education, and /certifications from the reference
// design were dropped since there's no real data for them yet. Add them
// back here (and a matching case in ChatBubble) once that content exists.
export const SLASH_COMMANDS: SlashCommand[] = [
  {
    command: "/projects",
    description: "List all professional projects",
    kind: "projects",
    summary: "Here are the projects I've shipped:",
  },
  {
    command: "/skills",
    description: "List technical and core skills",
    kind: "skills",
    summary: "Here's my current technical toolkit:",
  },
  {
    command: "/about",
    description: "A quick introduction",
    kind: "about",
    summary: "A bit about me:",
  },
  {
    command: "/contact",
    description: "How to get in touch",
    kind: "contact",
    summary: "Here's how to reach me:",
  },
];

export function matchSlashCommands(query: string): SlashCommand[] {
  const q = query.toLowerCase();
  if (!q.startsWith("/")) return [];
  return SLASH_COMMANDS.filter((c) => c.command.startsWith(q));
}

export function findExactSlashCommand(query: string): SlashCommand | undefined {
  return SLASH_COMMANDS.find((c) => c.command === query.trim().toLowerCase());
}
