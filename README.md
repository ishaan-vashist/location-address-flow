# Location Address Flow

A React-based web application that allows users to select, edit, delete, and save their addresses interactively on a map. The project also includes functionality to search and manage addresses, providing an intuitive user experience.

---

## Features

- **Interactive Map**: Users can select their location on a map.
- **CRUD Operations**: Create, Read, Update, and Delete addresses.
- **Search Functionality**: Dynamically filter through saved addresses.
- **Form Validation**: Ensures all required fields are filled before saving or editing.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Modern UI**: Styled using CSS for a clean and appealing interface.

---

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **React Router**: For navigation between pages.
- **Axios**: For handling HTTP requests.
- **React-Leaflet**: For interactive map functionality.

### Backend:
- **Node.js**: Backend runtime.
- **Express.js**: Framework for building the API.
- **MongoDB**: Database for storing address data.
- **Mongoose**: ORM for MongoDB.

### Additional Tools:
- **CSS**: For styling the application.
- **Dotenv**: For managing environment variables.

---

## Installation and Setup

### Prerequisites:
- Node.js and npm installed.
- MongoDB instance running locally or on a server.

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/location-address-flow.git
   cd location-address-flow
   ```

2. **Install Dependencies:**
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the backend directory:
     ```
     MONGO_URI=<Your MongoDB Connection URI>
     PORT=5000
     ```

4. **Start the Application:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
location-address-flow/
  ├── backend/
  │   ├── models/
  │   │   └── Address.js
  │   ├── routes/
  │   │   └── address.js
  │   ├── server.js
  │   └── .env
  ├── frontend/
  │   ├── src/
  │   │   ├── components/
  │   │   │   ├── Navbar.js
  │   │   │   ├── maps.js
  │   │   ├── pages/
  │   │   │   ├── AddressList.js
  │   │   │   ├── Home.js
  │   │   └── App.js
  │   ├── App.css
  │   └── index.js
```

---

## API Endpoints

### Address Routes:
- **GET** `/api/address/all`: Fetch all saved addresses.
- **POST** `/api/address/save`: Save a new address.
- **PUT** `/api/address/:id`: Update an address by ID.
- **DELETE** `/api/address/:id`: Delete an address by ID.

---

## Future Enhancements
- Add user authentication for address management.
- Integrate Google Maps API for enhanced geolocation services.
- Export saved addresses to a CSV or PDF format.

---

## License
This project is licensed under the MIT License.

---

## Author
Ishaan Vashist  
Built with ❤️ and dedication.
