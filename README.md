# Movies Library App

![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![HTML5 Badge](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge)
![CSS Badge](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff&style=for-the-badge)
![npm Badge](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=for-the-badge)


A React-based web application for browsing and exploring a collection of movies. Users can view a paginated list of movie posters and access detailed information for each movie, including plot summaries, cast, genres, and more.

## Features

- **Movie Browsing**: Browse through a paginated grid of movie posters
- **Detailed Views**: Click on any movie poster to view comprehensive details
- **Responsive Design**: Optimized for various screen sizes
- **Fast Navigation**: Efficient routing between movie list and details
- **API Integration**: Fetches movie data from a backend service

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A running backend API server on `http://localhost:8080` that provides movie data. The backend of this project can be found [here](https://github.com/Phlorion/SpringBootMoviesLibrary).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movieslibapp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Usage

- Navigate to the movies list to see available films
- Click on any movie poster to view detailed information
- Use pagination controls to browse through multiple pages of movies

### Building for Production

To build the app for production:

```bash
npm run build
```

This creates an optimized build in the `build` folder.

## Testing

Run the test suite:

```bash
npm test
```

## API Requirements

This application expects a backend API running on `http://localhost:8080` with the following endpoints:

- `GET /movies?page={page}&size={size}` - Retrieve paginated list of movies
- `GET /movies/{id}` - Retrieve details for a specific movie

The API should return movie objects with fields like `title`, `year`, `runtime`, `fullplot`, `genres`, `cast`, `poster`, and `imdb.id`.

## Support

If you encounter any issues or have questions:

- Check the [Issues](https://github.com/your-username/movieslibapp/issues) page on GitHub
- Review the code and API documentation for implementation details

## License

Distributed under the MIT License. See `LICENSE` for more information.
