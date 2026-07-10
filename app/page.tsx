import { redirect } from "next/navigation";

export default function Home() {
  // Landing on the root sends visitors straight to the whiteboard.
  redirect("/whiteboard");
}
