
# StriveMath CMS Project

## by: Cobus von Wielligh

StriveMath CMS Project is a full-stack application designed to manage and deliver content for StriveMath, a platform dedicated to enhancing math education. This project leverages Strapi as its headless CMS backend and Next.js for the frontend, offering a seamless content management and delivery experience.

### Project Structure

The repository is structured as a monorepo containing both the backend (Strapi app) and the frontend (Next.js app) codebases:

- `/backend/cms-backend`: Contains the Strapi application for content management.
- `/frontend/cms-frontend`: Contains the Next.js application for the frontend.

### Development Setup

To get started with development, you will need to set up both the frontend and backend applications. Here are the steps to run each application in development mode:

#### Backend Setup (Strapi)

1. Navigate to the backend directory:
   ```sh
   cd backend/cms-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run develop
   ```
   This will start the Strapi server in development mode, allowing you to manage your CMS content.

#### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```sh
   cd frontend/cms-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run develop
   ```
   This will start the Next.js development server, making the frontend application accessible locally for development purposes.

### Deployment

The applications are deployed separately to ensure optimal performance and scalability:

- **Backend (Strapi):** Deployed to [Strapi Cloud](https://cloud.strapi.io/) (Adjust this link to your actual Strapi backend deployment)
- **Frontend (Next.js):** Deployed to [Netlify](https://www.netlify.com/) (Adjust this link to your actual Next.js frontend deployment)

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Contact

For any inquiries or contributions, please contact Cobus von Wielligh at [cobusvonw@gmail.com](mailto:cobusvonw@gmail.com).

---
