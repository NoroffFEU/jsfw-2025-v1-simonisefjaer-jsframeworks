import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/productRoute/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div> "/productRoute/$id"!</div>
  );
}
