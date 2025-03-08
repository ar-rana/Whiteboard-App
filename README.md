# Collaborative Whiteboard
A real-time collaborative whiteboard where users can draw, erase, and collaborate with others on a HTML Canvas. The board supports multiple colors and erasing, and each session is PIN-protected to maintain privacy. Users can view all other collaborators with them on the board. The admin (creator) of the board has special privileges to remove users and reset the PIN.

## Features
- Real-time Drawing & Erasing on HTML Canvas
- PIN-Protected Private Whiteboards (Only the creator has access to the PIN)
- Live Collaboration - View and interact with other users in real time
- Remove Unwanted Users - Admin can remove users from the board
- Reset Whiteboard PIN - Admin can regenerate a new PIN
- STOMP WebSockets & Short-Polling - Seamless live updates and user tracking

## Tech Stack
### **Frontend:**
- React
- HTML Canvas
### **Backend:**
- Spring Boot
- STOMP WebSockets
- Redis

## Installation & Setup

1. Clone the repository:
### **Backend Setup:**
2. Configure Redis in `application.properties`.
3. Build and run the Spring Boot application:
   ```sh
   cd wsServer
   mvn clean install
   mvn spring-boot:run
   ```
### **Frontend Setup:**

1. Navigate to the frontend directory:
   ```sh
   cd client
   npm install
   npm start
   ```
