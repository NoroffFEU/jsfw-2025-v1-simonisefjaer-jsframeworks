import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "@/components/forms/contactForm";
export const Route = createFileRoute("/contactRoute")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-6 gap-3">
    <ContactForm />
  </div>
  ) 
}
