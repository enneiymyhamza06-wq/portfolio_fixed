import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock framer-motion bach matfshilch f tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useMotionValue: (val) => ({ set: jest.fn(), get: () => val }),
  useSpring: (val) => val,
}));

// Mock pages/components
jest.mock("./pages/Home", () => () => <div>Home</div>);
jest.mock("./pages/About", () => () => <div>About</div>);
jest.mock("./pages/Skills", () => () => <div>Skills</div>);
jest.mock("./pages/Projects", () => () => <div>Projects</div>);
jest.mock("./pages/Contact", () => () => <div>Contact</div>);
jest.mock("./components/Navbar", () => () => <nav>Navbar</nav>);
jest.mock("./components/CustomCursor", () => () => <div>Cursor</div>);
jest.mock("./components/LoadingScreen", () => ({ onComplete }) => {
  onComplete();
  return null;
});

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("renders main sections after loading", () => {
    render(<App />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});