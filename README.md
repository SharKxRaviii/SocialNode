📌 GitHub Project Description for SocialNode
🚀 SocialNode – A Scalable Social Media Backend API
SocialNode is a modular and scalable backend API built with Node.js, Express, and MongoDB, designed to power modern social networking platforms. It features a clean REST-API and robust middleware layers.

🔧 Features
🔐 User Profiles – Registration, login, and profile management with secure password handling.

📮 OTP Authentication – Send and verify OTPs for secure operations like login and verification.

📝 Posts & Comments – Create, update, and manage posts with comment threads.

👍 Likes System – Like and unlike posts with user-specific tracking.

👥 Friendship Management – Send, accept, and track friend requests with pending state handling.

🛡️ Middleware Stack – Authentication, validation, error handling, and request logging.

🧩 Clean Code Structure – Repository pattern, controller-service separation, and reusable utilities.

📁 Tech Stack
Node.js + Express.js – Backend framework

MongoDB (native driver) – NoSQL database

JWT & Bcrypt – Authentication and password hashing

Nodemailer – For sending one-time passwords


📈 Scalability & Extensibility
SocialNode is designed with modularity in mind — perfect for growing into a full-fledged social media platform or integrating into larger applications. Easily extend with new features like notifications, messaging, or image uploads.

🛠 Setup Instructions
git clone https://github.com/your-username/socialnode.git
cd socialnode
npm install
npm run dev
Set up your .env file with the following:

.env
PORT=3200
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN=ACCESSTOKEN
REFRESH_TOKEN=REFRESHTOKEN
EMAIL=emailID
PASSWORD=password
