export const apiUrl = "https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:15.4515,62.7838,7000000&limit=500&apiKey=7e2095ee83924cbf9b1d99db359cfd5d";
export async function fetchData(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      return data;
  } catch (e) {
      console.log(e);
      throw e;
  }
}


