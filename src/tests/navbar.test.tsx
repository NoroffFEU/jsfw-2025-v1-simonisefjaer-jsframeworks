import type { ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import NavBar from "../components/navBar/NavBar";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );

  return {
    ...actual,
    Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
      <a href={to} {...rest}>
        {children}
      </a>
    ),
  };
});

describe("NavBar", () => {
  const renderNavBar = () => render(<NavBar />);

  it("should render the navigation bar", () => {
    renderNavBar();
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("should display all navigation links", () => {
    renderNavBar();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
  });

  it("should have correct href attributes", () => {
    renderNavBar();
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should display logo or brand name", () => {
    renderNavBar();
    expect(
      screen.getByRole("img", { name: /your company/i }),
    ).toBeInTheDocument();
  });
});
