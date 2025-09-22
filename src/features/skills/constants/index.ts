import AngularIcon from "@/components/Icons/AngularIcon";
import ArcIcon from "@/components/Icons/ArcIcon";
import AstroIcon from "@/components/Icons/AstroIcon";
import BunIcon from "@/components/Icons/BunIcon";
import CanvaIcon from "@/components/Icons/CanvaIcon";
import ClaudeIcon from "@/components/Icons/ClaudeIcon";
import ElectronIcon from "@/components/Icons/ElectronIcon";
import FigmaIcon from "@/components/Icons/FigmaIcon";
import GeminiIcon from "@/components/Icons/GeminiIcon";
import IonicIcon from "@/components/Icons/IonicIcon";
import JestIcon from "@/components/Icons/JestIcon";
import MCPIcon from "@/components/Icons/MCPIcon";
import NextjsIcon from "@/components/Icons/NextjsIcon";
import NoteBookLMIcon from "@/components/Icons/NoteBookLMIcon";
import RaycastIcon from "@/components/Icons/RaycastIcon";
import ReactIcon from "@/components/Icons/ReactIcon";
import SketchIcon from "@/components/Icons/SketchIcon";
import TailwindIcon from "@/components/Icons/TailwindIcon";
import TypeScriptIcon from "@/components/Icons/TypeScriptIcon";
import WarpIcon from "@/components/Icons/WarpIcon";
import ZedIcon from "@/components/Icons/ZedIcon";
import type { SkillItem } from "@/features/skills/types";

export const FRONT_END_SKILLS: SkillItem[] = [
  { icon: NextjsIcon, title: "Next.js", rank: "gold" },
  { icon: TypeScriptIcon, title: "TypeScript", rank: "gold" },
  { icon: TailwindIcon, title: "Tailwind CSS", rank: "gold" },
  { icon: ReactIcon, title: "React" },
  { icon: AngularIcon, title: "Angular" },
  { icon: AstroIcon, title: "Astro" },
  { icon: IonicIcon, title: "Ionic" },
  { icon: ElectronIcon, title: "Electron" },
  { icon: JestIcon, title: "Jest" },
];

export const DESIGN_TOOLS: SkillItem[] = [
  { icon: FigmaIcon, title: "Figma", rank: "gold" },
  { icon: CanvaIcon, title: "Canva" },
  { icon: SketchIcon, title: "Sketch" },
];

export const TOOLS: SkillItem[] = [
  { icon: RaycastIcon, title: "Raycast", rank: "gold" },
  { icon: ArcIcon, title: "Arc", rank: "gold" },
  { icon: ZedIcon, title: "Zed" },
  { icon: WarpIcon, title: "Warp" },
  { icon: BunIcon, title: "Bun" },
];

export const AI: SkillItem[] = [
  { icon: ClaudeIcon, title: "Claude", rank: "gold" },
  { icon: GeminiIcon, title: "Google Gemini" },
  { icon: NoteBookLMIcon, title: "NotebookLM" },
  { icon: MCPIcon, title: "MCP" },
];
