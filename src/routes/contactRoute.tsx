import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contactRoute")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/contactRoute"!</div>;
}
