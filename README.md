# Task Manager Application Frontend

This is the frontend for the Task Manager application. It is built using [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Material UI](https://material-ui.com/) and [Dnd-kit](https://dndkit.com/). It is a simple application that allows users to create, update, delete, and view tasks. The application is built using a microservices architecture, with the frontend and backend services running in separate containers. The frontend service communicates with the backend service using RESTful APIs.

## Getting Started

### Prerequisites

-   Node.js 18.17.0 or higher. You can download it from [here](https://nodejs.org/en/download/).

### Installation

1. Install node dependencies:

    ```bash
    npm install
    ```

2. Create a `.env.local` file in the root of the project and add the following environment variables:

    ```bash
    NEXT_PUBLIC_BACKEND_SERVICE_BASE_URI=http://localhost:5001/api
    ```

3. Choose the right Node version using:

    ```bash
    nvm use 18.17.0
    ```

### Running the Application

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Features

-   Create a new task
-   Update an existing task
-   Delete a task
-   Delete all tasks
-   Drag and drop tasks to reorder them or move them to a different status
-   Mark a task as completed
-   Filter tasks by status and description

### Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [Next.js](https://nextjs.org/) - The React framework for production
-   [Material UI](https://material-ui.com/) - React components for faster and easier web development
-   [Dnd-kit](https://dndkit.com/) - A modern, lightweight, performant drag-and-drop library
