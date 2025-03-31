# Student Dashboard
📌 Project Overview

This student dashboard is a comprehensive web application that consolidates data from multiple sources to provide personalized insights. It features an interactive dashboard, an automated newsletter, and a chatbot for query resolution. The system integrates data from Spotify, Codeforces, Kaggle, and weather APIs, offering real-time updates and analytics.

🛠️ Tech Stack

Frontend: React, Vite, HTML, CSS, Tamagui, Shadcn UI

Backend: Node.js, Express.js, MongoDB

Chatbot: Python, Flask, Chatbase.io, spaCy

Newsletter: Python, Flask, HTML, CSS

APIs: Spotify API, Codeforces API, Kaggle API, Weather API

Authentication: JWT (JSON Web Tokens)

🚀 Features

Dashboard: Real-time data visualization from various APIs.

Newsletter: Weekly automated email summarizing user activity.

Chatbot: AI-powered conversational assistant to answer user queries.

Data Management: Secure storage using MongoDB.

API Integration: Efficient data fetching and display.

📊 Data Flow

User Registration: Spotify and Codeforces usernames are stored in MongoDB during registration.

Data Fetching: APIs fetch real-time data for dashboard visualization and chatbot responses.

Newsletter Generation: Using Flask, personalized newsletters are generated and sent to users.

Chatbot Queries: User queries are processed using Chatbase.io and NLP for relevant responses.

🤖 API Endpoints

GET /dashboard - Fetches user-specific dashboard data.

POST /login - Authenticates users using JWT.

POST /newsletter - Generates and sends newsletters.

POST /chatbot - Handles user chatbot queries.

🛡️ Security

JWT-based authentication ensures secure access.

Sensitive data is stored securely using MongoDB.

🏗️ Future Enhancements

Integrate more APIs for expanded insights.

Enhance chatbot with additional conversational capabilities.

Provide more detailed analytics in the dashboard.

🧑‍🤝‍🧑 Contributors

Manasvi Singh - Chatbot Development, Newsletter UI, Data Flow Management.

Other Team Members - Dashboard Development, API Integration, Backend Management.

📄 License

This project is licensed under the MIT License.

