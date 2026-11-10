
import "regenerator-runtime/runtime.js";

export interface Country {
  names: {
    common: string;
  };
  languages: {
    name: string;
    iso639_1: string;
  }[];
}

const httpRequest = async () => {
  const apiKey = import.meta.env.VITE_COUNTRIES_API_KEY;
  
  console.log("API key loaded:", Boolean(apiKey));

  const response = await fetch(
    "https://api.restcountries.com/countries/v5?limit=100",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve country information.");
  }

  const result = await response.json();

  return result.data.objects as Country[];
};

export default httpRequest;
