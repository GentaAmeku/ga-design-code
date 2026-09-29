import { notFound } from "next/navigation";

// 言語の下でどのページにも当たらない URL を、その言語のレイアウトの 404 で出す
export const dynamicParams = true;

export default function CatchAll() {
  notFound();
}
