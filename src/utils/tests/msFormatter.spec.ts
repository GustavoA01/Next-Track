import { msFormatter } from "@/utils/msFormatter";

describe("msFormatter", () => {
  it("formats 0 ms correctly", () => {
    const { hours, minutes, seconds } = msFormatter(0);

    expect(hours).toEqual(0);
    expect(minutes).toEqual(0);
    expect(seconds).toEqual("00");
  });

  it("formats seconds with leading zero", () => {
    const { hours, minutes, seconds } = msFormatter(5000);

    expect(hours).toEqual(0);
    expect(minutes).toEqual(0);
    expect(seconds).toEqual("05");
  });

  it("formats minutes correctly", () => {
    const { hours, minutes, seconds } = msFormatter(61_000);

    expect(hours).toEqual(0);
    expect(minutes).toEqual(1);
    expect(seconds).toEqual("01");
  });

  it("formats hours, minutes and seconds correctly", () => {
    const { hours, minutes, seconds } = msFormatter(3_661_000);

    expect(hours).toEqual(1);
    expect(minutes).toEqual(1);
    expect(seconds).toEqual("01");
  });
});
