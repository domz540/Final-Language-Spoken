
import {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  getResponse,
} from "./language_spoken";

describe("Language Spoken Tests", () => {
  describe("capitalize()", () => {
    it("capitalizes the first letter", () => {
      expect(capitalize("english")).toBe("English");
    });

    it("converts the remaining letters to lowercase", () => {
      expect(capitalize("sPANISH")).toBe("Spanish");
    });
  });

  describe("getAlpha2Code()", () => {
    it("returns aa for Afar", () => {
      expect(getAlpha2Code("Afar")).toBe("aa");
    });

    it("returns en for English", () => {
      expect(getAlpha2Code("English")).toBe("en");
    });

    it("returns es for Spanish", () => {
      expect(getAlpha2Code("Spanish")).toBe("es");
    });

    it("returns undefined for an unknown language", () => {
      expect(getAlpha2Code("Unknown")).toBeUndefined();
    });
  });

  describe("countryExtractor()", () => {
    it("extracts country names from country objects", () => {
      const input = [
        { name: "Argentina" },
        { name: "Belize" },
        { name: "Bolivia" },
      ];

      expect(countryExtractor(input)).toEqual([
        "Argentina",
        "Belize",
        "Bolivia",
      ]);
    });

    it("returns an empty array when given an empty object", () => {
      expect(countryExtractor({})).toEqual([]);
    });

    it("extracts a single country name", () => {
      const input = [
        { name: "Philippines" },
      ];

      expect(countryExtractor(input)).toEqual(["Philippines"]);
    });
  });

  describe("getResponse()", () => {
    it("returns the correct message for multiple countries", () => {
      const countries = ["Argentina", "Belize", "Bolivia"];

      expect(getResponse("english", countries)).toBe(
        "English is spoken in 3 countries around the world"
      );
    });

    it("returns the correct message for an empty country list", () => {
      expect(getResponse("spanish", [])).toBe(
        "Spanish is spoken in 0 countries around the world"
      );
    });
  });
});
