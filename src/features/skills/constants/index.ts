import AngularIcon from "@/components/Icons/AngularIcon";
import ArcIcon from "@/components/Icons/ArcIcon";
import AstroIcon from "@/components/Icons/AstroIcon";
import ClaudeDesignIcon from "@/components/Icons/ClaudeDesignIcon";
import ClaudeIcon from "@/components/Icons/ClaudeIcon";
import CodexIcon from "@/components/Icons/CodexIcon";
import FigmaIcon from "@/components/Icons/FigmaIcon";
import GeminiIcon from "@/components/Icons/GeminiIcon";
import GhosttyIcon from "@/components/Icons/GhosttyIcon";
import GrokIcon from "@/components/Icons/GrokIcon";
import HermesAgentIcon from "@/components/Icons/HermesAgentIcon";
import NextjsIcon from "@/components/Icons/NextjsIcon";
import OrcaIcon from "@/components/Icons/OrcaIcon";
import RaycastIcon from "@/components/Icons/RaycastIcon";
import SketchIcon from "@/components/Icons/SketchIcon";
import TanStackStartIcon from "@/components/Icons/TanStackStartIcon";
import type { SkillItem } from "@/features/skills/types";

export const FRONT_END_SKILLS: SkillItem[] = [
  { icon: NextjsIcon, title: "Next.js", rank: "gold" },
  { icon: TanStackStartIcon, title: "TanStack Start", rank: "gold" },
  { icon: AngularIcon, title: "Angular" },
  { icon: AstroIcon, title: "Astro" },
];

export const DESIGN_TOOLS: SkillItem[] = [
  { icon: FigmaIcon, title: "Figma", rank: "gold" },
  { icon: SketchIcon, title: "Sketch" },
  { icon: ClaudeDesignIcon, title: "Claude Design", rank: "gold" },
];

export const TOOLS: SkillItem[] = [
  { icon: OrcaIcon, title: "Orca (ADE)", rank: "gold" },
  { icon: GhosttyIcon, title: "Ghostty" },
  { icon: RaycastIcon, title: "Raycast", rank: "gold" },
  { icon: ArcIcon, title: "Arc", rank: "gold" },
];

export const AI: SkillItem[] = [
  { icon: ClaudeIcon, title: "Claude", rank: "gold" },
  { icon: CodexIcon, title: "Codex", rank: "gold" },
  { icon: GeminiIcon, title: "Gemini", rank: "gold" },
  { icon: GrokIcon, title: "Grok", rank: "gold" },
  { icon: HermesAgentIcon, title: "Hermes Agent", rank: "gold" },
];
