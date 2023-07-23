
# Community Site

Welcome to the Community Site! This web application is built using HTML, CSS, JavaScript, Node.js, and MongoDB. It serves as a platform where users can ask questions and add answers to engage in community discussions.

## Live Demo

Check out the live demo of the Community Site: [Community Site Demo](https://your-community-site-demo-url)
Demo will be updated soon

## Prerequisites

Before you proceed, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org) (Download and install)
- [MongoDB](https://www.mongodb.com/try/download/community) (Download and install)

## How to Run

Follow these steps to run the Community Site on your local machine:

1. **Clone the Repository:** First, clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/your-username/community-site.git
   ```

2. **Install Dependencies:** Navigate to the project directory in your terminal and run the following command to install the required Node.js packages:

   ```bash
   npm install
   ```

3. **Start MongoDB Server:** Make sure you have MongoDB installed and running on your machine. If it's not running, start the MongoDB server using the following command:

   ```bash
   mongod
   ```

4. **Set Environment Variables:** Create a new file named `.env` in the root of the project directory. Inside this file, define the environment variables for the MongoDB connection:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_uri
   ```

   Replace `your_mongodb_connection_uri` with the actual MongoDB connection URI for your local or remote MongoDB instance.

5. **Run the Application:** After setting up the environment variables, start the application using the following command:

   ```bash
   npm start
   ```

   or

   ```bash
   npm run dev
   ```

6. **Access the Website:** The Community Site should now be accessible at `http://localhost:3000` in your web browser.

## How to Use

The Community Site provides a user-friendly interface where users can perform the following actions:

- **Ask Questions:** Users can ask questions related to the community's topics by filling out the "Ask a Question" form and submitting it. The question will be added to the community forum for others to view and answer.

- **Add Answers:** Users can contribute to community discussions by providing answers to questions posted by others. The "Add Answer" form allows users to share their knowledge and insights with the community.

- **View Questions and Answers:** The main page of the website displays a list of questions asked by various users. Users can click on a question to view its details and the corresponding answers.

- **Search Functionality:** The website may offer a search functionality to allow users to search for questions based on specific keywords or tags.

- **User Authentication:** This website has user authentication features, such as user registration and login, to manage user access and permissions. This ensures that the user can only ask a question or answer a question if and only if they are registered on the website.

## Technologies Used

The technologies used in this project are:

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- Express-session
- HTML, CSS, JavaScript
- Handlebars (hbs)
- Git

The technologies used in this project follow the MEAN stack (MongoDB, Express, Angular, Node.js) with Handlebars as the templating engine instead of Angular for the front-end.

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request on the GitHub repository. Your feedback and contributions are highly appreciated!

---

Thank you for using the Community Site! If you have any questions or need assistance, feel free to reach out to us through our GitHub repository or email. Happy community building!

Created by Swikrit Shukla - All rights reserved.
```
