import { logRoles } from "@testing-library/react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";
import { kebabCaseToTitleCase } from "./helpers";

describe("Testing the main page", () => {

  test("see all roles", () => { 
    const { container } = render(<App />);
    logRoles(container);
  } );
  
  test("button starts with correct color", () => {
    render(<App />);
    const colorButton = screen.getByRole("button", { name: /blue/i });
    expect(colorButton).toHaveClass("medium-violet-red");
    expect(colorButton).toHaveStyle("background-color: rgb(199, 21, 133)");
  } );
  
  test("button starts with correct text", () => {
    render(<App />);
    const colorButton = screen.getByRole("button", { name: /blue/i });
    expect(colorButton).toHaveTextContent("Change to Midnight Blue");
  } );
  
  test("button has correct color after click", () => {
    render(<App />);
    const colorButton = screen.getByRole("button", { name: /blue/i });
    fireEvent.click(colorButton);
    expect(colorButton).toHaveClass("midnight-blue");
    expect(colorButton).toHaveStyle("background-color: rgb(25, 25, 112)");
  } );
  
  test("button has correct text after click", () => { 
    render(<App />);
    const colorButton = screen.getByRole("button", { name: /blue/i });
    fireEvent.click(colorButton);
    expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
  } );
  
  test("button flow", () => {
    // renderiza o componente e encontra o botão
    render(<App />);
    const colorButton = screen.getByRole("button", { name: /blue/i });
    const checkbox = screen.getByRole("checkbox", { name: /disable button/i});
  
    // desabilita o botão
    fireEvent.click(checkbox);
  
    // o botão agora deve ter a cor cinza (sem alterações no texto)
    expect(colorButton).toHaveClass("gray");
    expect(colorButton).toHaveStyle("background-color: rgb(128, 128, 128)");
  
    // reabilita o botão
    fireEvent.click(checkbox);
    
    // botão começa com a cor vermelha e texto "Change to blue"
    expect(colorButton).toHaveClass("medium-violet-red");
    expect(colorButton).toHaveStyle("background-color: rgb(199, 21, 133)");
    expect(colorButton).toHaveTextContent("Change to Midnight Blue");
  
    // clica no botão
    fireEvent.click(colorButton);
  
    // botão agora deve ter a cor azul e texto "Change to red"
    expect(colorButton).toHaveClass("midnight-blue");
    expect(colorButton).toHaveStyle("background-color: rgb(25, 25, 112)");
    expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
  
    // desabilita o botão
    fireEvent.click(checkbox);
  
    // o botão agora deve ter a cor cinza (sem alterações no texto)
    expect(colorButton).toHaveClass("gray");
    expect(colorButton).toHaveStyle("background-color: rgb(128, 128, 128)");
  
    // reabilita o botão
    fireEvent.click(checkbox);
  
    // botão agora deve ter a cor azul e texto "Change to red"
    expect(colorButton).toHaveClass("midnight-blue");
    expect(colorButton).toHaveStyle("background-color: rgb(25, 25, 112)");
    expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
  
  } );
  
  test("checkbox flow", () => {
    // renderiza o componente e encontra o botão e a checkbox
    render(<App />);
    const colorButton = screen.getByRole("button", {name: /blue/i});
    const checkbox = screen.getByRole("checkbox", { name: /disable button/i});
  
    // inicialmente, o botão deve estar enabled e a checkbox unchecked
    expect(checkbox).not.toBeChecked();
    expect(colorButton).toBeEnabled();
  
    // clica na checkbox
    fireEvent.click(checkbox);
  
    // o botão agora deve estar disabled e a checkbox checked
    expect(checkbox).toBeChecked();
    expect(colorButton).not.toBeEnabled();
  
    // clica novamente na checkbox
    fireEvent.click(checkbox);
  
    // o botão agora deve estar novamente enabled e a checkbox unchecked
    expect(checkbox).not.toBeChecked();
    expect(colorButton).toBeEnabled();
  
  } );
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphen", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
} );