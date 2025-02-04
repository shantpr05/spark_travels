// API URL for fetching accommodation data from Geoapify API
export const apiUrl = "https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:15.4515,62.7838,7000000&limit=30&apiKey=7e2095ee83924cbf9b1d99db359cfd5d";

// Async function to fetch data from a provided URL
export async function fetchData(url) {
  try {
      // Attempt to fetch data from the URL
      const response = await fetch(url);

      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
          // If response is not ok, throw an error with the status text
          throw new Error("Network response was not ok " + response.statusText);
      }

      // Parse the response as JSON and return the data
      const data = await response.json();
      return data;
  } catch (e) {
      // Log any errors to the console and rethrow them
      console.log(e);
      throw e;
  }
}


