import { jest } from "@jest/globals";

const mockHttpRequest = jest.fn<
  () => Promise<
    {
      names: { common: string };
      languages: { name: string; iso639_1: string }[];
    }[]
  >
>();

await jest.unstable_mockModule("./utils/http-request", () => ({
  default: mockHttpRequest,
}));

const { countryListLookup } = await import("./language_spoken");

describe("countryListLookup()", () => {
  beforeEach(() => {
    mockHttpRequest.mockReset();
  });

  it("returns countries where the language is spoken", async () => {
    mockHttpRequest.mockResolvedValue([
      {
        names: { common: "Canada" },
        languages: [
          { name: "English", iso639_1: "en" },
          { name: "French", iso639_1: "fr" },
        ],
      },
      {
        names: { common: "United States" },
        languages: [
          { name: "English", iso639_1: "en" },
        ],
      },
    ]);

    await expect(countryListLookup("en")).resolves.toEqual([
      "Canada",
      "United States",
    ]);
  });

  it("returns undefined when the request fails", async () => {
    mockHttpRequest.mockRejectedValue(new Error("Request failed"));

    await expect(countryListLookup("en")).resolves.toBeUndefined();
  });
});