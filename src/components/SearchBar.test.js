import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar component", () => {
  let onSearchMock;

  beforeEach(() => {
    onSearchMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search bar and button", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    
    const inputEl = screen.getByPlaceholderText("🔍 Search for a recipe...");
    expect(inputEl).toBeInTheDocument();

    const buttonEl = screen.getByRole("button", { name: /search/i });
    expect(buttonEl).toBeInTheDocument();
  });

  test("typing in the text field updates its value", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const inputEl = screen.getByPlaceholderText("🔍 Search for a recipe...");

    fireEvent.change(inputEl, { target: { value: "PB&J" } });
    expect(inputEl).toHaveValue("PB&J");
  });

  test("clicking Search button calls onSearch with the query if input is non-empty", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const inputEl = screen.getByPlaceholderText("🔍 Search for a recipe...");
    const buttonEl = screen.getByRole("button", { name: /search/i });

    fireEvent.change(inputEl, { target: { value: "PB&J" } });
    fireEvent.click(buttonEl);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("PB%26J");
  });

  test("clicking Search button does nothing if input is empty", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const buttonEl = screen.getByRole("button", { name: /search/i });

    fireEvent.click(buttonEl);

    expect(onSearchMock).not.toHaveBeenCalled();
  });

  test("pressing Enter calls onSearch if input is non-empty", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const inputEl = screen.getByPlaceholderText("🔍 Search for a recipe...");

    fireEvent.change(inputEl, { target: { value: "Pizza" } });
    fireEvent.keyDown(inputEl, { key: "Enter", code: "Enter" });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("Pizza");
  });

  test("pressing Enter does nothing if input is empty", () => {
    render(<SearchBar onSearch={onSearchMock} />);
    const inputEl = screen.getByPlaceholderText("🔍 Search for a recipe...");

    fireEvent.keyDown(inputEl, { key: "Enter", code: "Enter" });

    expect(onSearchMock).not.toHaveBeenCalled();
  });
});