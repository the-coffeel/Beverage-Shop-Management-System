import type { Route } from "./+types/home";
import { Welcome } from "./welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyTeam - Welcome" },
    { name: "description", content: "Welcome to MyTeam atom ERP!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
