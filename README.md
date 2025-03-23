# ScreenVault

A full-stack MERN application to help you track and organize your watchlist of movies, TV shows, anime, and more.

## Features

- **Modern UI**: Clean, responsive interface with Material UI components
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Advanced Filtering**: Filter items by status, type, and search text
- **Custom Sorting**: Sort by newest, oldest, title, or rating
- **Bookmark System**: Save your favorites for quick access
- **Interactive Cards**: Animated cards with hover effects
- **Detailed Views**: Comprehensive item detail pages
- **CRUD Operations**: Create, read, update, and delete watchlist items
- **Responsive Design**: Works on mobile, tablet, and desktop

## Technologies

### Frontend

- React.js
- Material UI
- Framer Motion (animations)
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/screenvault.git
cd screenvault
```

2. Install server dependencies

```bash
cd server
npm install
```

3. Set up environment variables

   - Create a `.env` file in the server directory
   - Add your MongoDB connection string:

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Install client dependencies

```bash
cd ../client
npm install
```

5. Set up the proxy in client's package.json

```json
"proxy": "http://localhost:5000"
```

## Running the Application

### Development Mode

1. Start the server

```bash
cd server
npm run dev
```

2. Start the client (in a new terminal)

```bash
cd client
npm run dev
```

3. Access the application at `http://localhost:5173`

### Production Build

1. Build the client

```bash
cd client
npm run build
```

2. Start the server (which will serve the client build)

```bash
cd ../server
npm start
```

## Usage Guide

### Adding a New Item

1. Click the "Add to Watchlist" button in the navbar
2. Fill in details like title, type, status, and rating
3. Add an optional image URL and notes
4. Submit to add to your collection

### Managing Your Watchlist

- **Filtering**: Use the filter bar to narrow down by status, type, or search term
- **Sorting**: Arrange items by newest, oldest, alphabetical, or rating
- **Bookmarking**: Click the bookmark icon to save favorites
- **Editing**: Use the edit button to update item details
- **Deleting**: Remove items with the delete button
- **Viewing Details**: Click on an item to see its detailed view

### Accessing Bookmarks

- Navigate to the Bookmarks page via the navbar
- View and manage your saved favorites

## API Endpoints

### Watchlist Items

- `GET /api/watchlist` - Get all watchlist items
- `GET /api/watchlist/bookmarks` - Get all bookmarked items
- `GET /api/watchlist/:id` - Get a specific item
- `POST /api/watchlist` - Create a new item
- `PUT /api/watchlist/:id` - Update an item
- `PUT /api/watchlist/:id/bookmark` - Toggle bookmark status
- `DELETE /api/watchlist/:id` - Delete an item

## Project Structure

```
screenvault/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── context/        # React context providers
│       └── assets/         # Images and styles
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
└── README.md               # This file
```

## Future Enhancements

- User authentication
- Social sharing
- Public and private watchlists
- Statistics and progress tracking
- Integration with movie/TV APIs
- Recommendations engine
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material UI for the component library
- MongoDB for the database
- React team for the frontend framework
- Express for the backend framework
