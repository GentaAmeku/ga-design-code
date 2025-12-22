import AngularIcon from "@/components/Icons/AngularIcon";
import ArcIcon from "@/components/Icons/ArcIcon";
import AstroIcon from "@/components/Icons/AstroIcon";
import CanvaIcon from "@/components/Icons/CanvaIcon";
import ChatGPTIcon from "@/components/Icons/ChatGPTIcon";
import ClaudeIcon from "@/components/Icons/ClaudeIcon";
import CursorIcon from "@/components/Icons/CursorIcon";
import EffectIcon from "@/components/Icons/EffectIcon";
import ElectronIcon from "@/components/Icons/ElectronIcon";
import FigmaIcon from "@/components/Icons/FigmaIcon";
import GeminiIcon from "@/components/Icons/GeminiIcon";
import GhosttyIcon from "@/components/Icons/GhosttyIcon";
import IonicIcon from "@/components/Icons/IonicIcon";
import JestIcon from "@/components/Icons/JestIcon";
import MCPIcon from "@/components/Icons/MCPIcon";
import NextjsIcon from "@/components/Icons/NextjsIcon";
import NoteBookLMIcon from "@/components/Icons/NoteBookLMIcon";
import RaycastIcon from "@/components/Icons/RaycastIcon";
import ReactIcon from "@/components/Icons/ReactIcon";
import SketchIcon from "@/components/Icons/SketchIcon";
import TailwindIcon from "@/components/Icons/TailwindIcon";
import TanStackStartIcon from "@/components/Icons/TanStackStartIcon";
import TypeScriptIcon from "@/components/Icons/TypeScriptIcon";
import VitestIcon from "@/components/Icons/VitestIcon";
import type { SkillItem } from "@/features/skills/types";

export const FRONT_END_SKILLS: SkillItem[] = [
  { icon: NextjsIcon, title: "Next.js", rank: "gold" },
  { icon: TanStackStartIcon, title: "TanStack Start", rank: "gold" },
  { icon: TypeScriptIcon, title: "TypeScript", rank: "gold" },
  { icon: TailwindIcon, title: "Tailwind CSS", rank: "gold" },
  { icon: EffectIcon, title: "Effect" },
  { icon: ReactIcon, title: "React" },
  { icon: AngularIcon, title: "Angular" },
  { icon: AstroIcon, title: "Astro" },
  { icon: IonicIcon, title: "Ionic" },
  { icon: ElectronIcon, title: "Electron" },
  { icon: JestIcon, title: "Jest" },
  { icon: VitestIcon, title: "Vitest" },
];

export const DESIGN_TOOLS: SkillItem[] = [
  { icon: FigmaIcon, title: "Figma", rank: "gold" },
  { icon: CanvaIcon, title: "Canva" },
  { icon: SketchIcon, title: "Sketch" },
];

export const TOOLS: SkillItem[] = [
  { icon: RaycastIcon, title: "Raycast", rank: "gold" },
  { icon: ArcIcon, title: "Arc", rank: "gold" },
  { icon: CursorIcon, title: "Cursor", rank: "gold" },
  { icon: GhosttyIcon, title: "Ghostty" },
];

export const AI: SkillItem[] = [
  { icon: ClaudeIcon, title: "Claude", rank: "gold" },
  { icon: ChatGPTIcon, title: "ChatGPT", rank: "gold" },
  { icon: GeminiIcon, title: "Google Gemini", rank: "gold" },
  { icon: NoteBookLMIcon, title: "NotebookLM" },
  { icon: MCPIcon, title: "MCP" },
];
