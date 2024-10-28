
**Readme**

**Project Title:** Real-Time Weather Monitoring Application

**Description:**

This web application provides real-time weather information for various locations. It utilizes the OpenWeatherMap API to fetch weather data and displays it in an intuitive user interface.

**Installation:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/adakulapallypavan/Weather_App
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Weather_App
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

**Running the Application:**

1. **Start the Development Server:**

   ```bash

   cd client
   
   npm run dev
   ```

   cd server
   npm run dev

3. **Access the Application:**

   Open your web browser and navigate to `http://localhost:3000`

**Project Structure:**

```
├── client
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       ├── App.jsx
│       └── index.js
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
└── README.md
```

**Technologies Used:**

- **Frontend:** React, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **API:** OpenWeatherMap API

**License:**

This project is licensed under the MIT License.

**Additional Notes:**

- **API Key:** Ensure you have obtained an API key from OpenWeatherMap and set it in your .env file(VITE_API_KEY and VITE_RAPID_API_KEY).

