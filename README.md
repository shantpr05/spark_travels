# Hotel Management System

A hotel management web application that allows users to view, search, filter, add, and delete hotels. It also provides functionality for users to manage hotel details, including location, category, and contact information.

## Features

- **Hotel Listing**: Displays a list of hotels with details such as hotel name, address, city, and phone number.
- **Search Functionality**: Users can search for hotels by name, city, address, or phone number.
- **Filter by Location and Category**: Users can filter the hotel list by location (city, country) and hotel category.
- **Add New Hotel**: Administrators can add new hotels with details such as name, address, phone number, and website.
- **Delete Hotel**: Users can delete hotels from the list.
- **Edit Hotel**: Users can edit hotel details.

## Tech Stack

- **Frontend**:
  - React
  - React Router for routing
  - React Icons for icons
  - CSS Modules for styling
- **Backend (API)**:
  - A sample public API to fetch hotel data (can be replaced with a real backend API)
- **State Management**:
  - React's `useState` and `useEffect` for managing and updating state.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/hotel-management.git
    cd hotel-management
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

    The application will be running on `http://localhost:3000`.

## Project Structure

- **`src/`**: Contains all the source code for the project
  - **`components/`**: Contains React components such as `Navbar`, `Mainlist`, `AddNewHotel`, etc.
  - **`styles/`**: Contains CSS Modules for styling
  - **`hooks/`**: Contains custom hooks like `useLogic` to manage business logic and state
  - **`assets/`**: Contains images such as logos and default hotel images
  - **`Functions/`**: Contains utility functions such as `fetchData` to interact with APIs
  - **`App.js`**: Main application component
  - **`index.js`**: Entry point to render the React app

## How It Works

1. **MainList Component**: Displays a list of hotels. Users can filter by location, category, or search term. Each hotel item has buttons for editing and deleting.
2. **Navbar Component**: Provides a search bar to search for hotels and buttons for navigation between pages.
3. **AddNewHotel Component**: A form for adding new hotels with fields like name, address, phone, and website.
4. **EditHotel Component**: Allows users to edit existing hotel details.
5. **DeleteItem Component**: Allows users to delete hotels.

## Custom Hooks

- **`useLogic`**: Manages all hotel-related business logic:
  - Fetches hotel data from an external API.
  - Filters hotels based on location, category, and search query.
  - Handles adding new hotels and updating existing ones.
  
## API Integration

The application uses a mock API (`apiUrl`) to fetch hotel data. The data is displayed in the app and can be filtered by location and category. The `fetchData` function is used to retrieve this data.

## Contributing

If you want to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The project uses [Geoapify Static Maps](https://www.geoapify.com/) for hotel location maps.
- The icons used in the app are from [React Icons](https://react-icons.github.io/react-icons/).
