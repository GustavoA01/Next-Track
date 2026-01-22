import { renderHook } from "@testing-library/react";
import { useStatisticTab } from "./useStatisticTab";
import { act } from "react-dom/test-utils";

jest.mock("extract-colors", () => ({
  extractColors: jest.fn(async () => [{ hex: "#abcdef" }]),
}));

describe("useStatisticTab", () => {
  it("formatName correctly", () => {
    const { result } = renderHook(() =>
      useStatisticTab({
        items: [],
        total: 0,
        primary_color: "green",
        href: "",
      }),
    );

    const formattedName1 = result.current.formatName("rock");
    const formattedName2 = result.current.formatName("roKc");
    const formattedName3 = result.current.formatName("rOCK");

    expect(formattedName1).toBe("Rock");
    expect(formattedName2).toBe("RoKc");
    expect(formattedName3).toBe("ROCK");
  });

  it("getHexaColor returns default color when no URL is provided", async () => {
    const { result } = renderHook(() =>
      useStatisticTab({ items: [], total: 0, href: "", primary_color: "" }),
    );

    let color;
    await act(async () => {
      color = await result.current.getHexaColor("");
    });

    expect(color).toBe("#121212");
  });

  it("getHexaColor handles error and does not throw exception", async () => {
    const { result } = renderHook(() =>
      useStatisticTab({ items: [], total: 0, href: "", primary_color: "" }),
    );

    const { extractColors } = require("extract-colors");
    extractColors.mockImplementationOnce(() => {
      throw new Error("fail");
    });

    let color;
    await act(async () => {
      color = await result.current.getHexaColor("fake-url");
    });

    expect(color).toBeUndefined();
  });
});
