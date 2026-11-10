
import languageCodes from "./utils/languageCodes";
import httpRequest from "./utils/http-request";
import type { Country } from "./utils/http-request";
import "regenerator-runtime/runtime";

const { languageInEnglish, alpha2Codes } = languageCodes;

// Capitalize the first letter of a language
const capitalize = (language: string): string => {
  return language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
};

// Get the Alpha-2 code of a language
const getAlpha2Code = (language: string): string | undefined => {
  const codeIndex = languageInEnglish.indexOf(language);

  return codeIndex !== -1 ? alpha2Codes[codeIndex] : undefined;
};

// Extract country names from an array
const countryExtractor = (
  countries:
    | Country[]
    | Array<{ name: string }>
    | Record<string, { name: string }>
): string[] => {
  if (!Array.isArray(countries)) {
    return Object.values(countries).map((country) => country.name);
  }

  return countries.map((country) => {
    if ("names" in country) {
      return country.names.common;
    }

    return country.name;
  });
};

// Look up countries using the language code
const countryListLookup = async (
  alpha2Code: string | number
): Promise<string[] | undefined> => {
  try {
    const countries = await httpRequest();

    const matchingCountries = countries.filter((country) =>
      country.languages.some(
        (language) => language.iso639_1 === alpha2Code
      )
    );

    return countryExtractor(matchingCountries);
  } catch {
    return undefined;
  }
};

// Generate the language response
const getResponse = (
  language: string,
  listOfPlaces: string[] | undefined
): string => {
  return `${capitalize(language)} is spoken in ${
    listOfPlaces?.length ?? 0
  } countries around the world`;
};

export {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse,
};
