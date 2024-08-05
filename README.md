Here's a detailed `README.md` file for your project, incorporating all the relevant information and instructions on how to run the app locally.

```markdown
# Mini Instagram

## Description

Mini Instagram is a social media application that allows users to create posts and manage their profiles. This project uses NestJS for the backend, Prisma as an ORM for database management, and GraphQL for API queries.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version `18.x` or higher.
- **yarn**: Version `6.x` or higher (comes with Node.js).
- **PostgreSQL**: Ensure you have PostgreSQL installed and running if you're using it as your database.
- **Prisma**: Make sure you have Prisma installed as a dev dependency in your project.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mini-instagram.git
cd mini-instagram
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project. You can use the `.env.example` file as a reference to set up your environment variables. Here’s an example:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public"
PORT=3000
```

Replace `username`, `password`, `localhost`, `5432`, and `mydatabase` with your PostgreSQL database credentials and connection details.

### 4. Run Database Migrations

Apply the database migrations to set up your schema. Ensure that your database is running.

```bash
npx prisma migrate dev
```

### 5. Seed the Database (Optional)

If you have seed data to populate your database, you can run the seed script:

```bash
yarn seed
```

### 6. Start the Application

Run the development server:

```bash
yarn start:dev
```

This command will start the application in development mode. The server will be accessible at `http://localhost:3000` (or the port specified in your `.env` file).

## GraphQL Queries and Mutations

You can use GraphQL Playground or a similar tool to interact with your API. Here are some example queries and mutations:

### Posts

- **Create a Post**

  ```graphql
  mutation {
    createPost(createPostInput: { caption: "My new post", imageUrl: "http://example.com/image.jpg", userId: "user-id" }) {
      id
      caption
      imageUrl
    }
  }
  ```

- **Fetch Random Posts**

  ```graphql
  query {
    feeds(page: 1, perPage: 10) {
      id
      caption
      imageUrl
    }
  }
  ```

- **Fetch Posts by User**

  ```graphql
  query {
    posts(userId: "user-id", page: 1, perPage: 10) {
      id
      caption
      imageUrl
    }
  }
  ```

- **Find a Post by ID**

  ```graphql
  query {
    post(id: "post-id") {
      id
      caption
      imageUrl
    }
  }
  ```

- **Update a Post**

  ```graphql
  mutation {
    updatePost(updatePostInput: { id: "post-id", caption: "Updated caption", imageUrl: "http://example.com/new-image.jpg" }) {
      id
      caption
      imageUrl
    }
  }
  ```

- **Remove a Post**

  ```graphql
  mutation {
    removePost(id: "post-id") {
      id
      caption
    }
  }
  ```

### Users

- **Create a User**

  ```graphql
  mutation {
    createUser(createUserInput: { username: "newuser", email: "newuser@example.com", password: "password123" }) {
      id
      username
      email
    }
  }
  ```

- **Fetch All Users**

  ```graphql
  query {
    users(page: 1, perPage: 10) {
      id
      username
      email
    }
  }
  ```

- **Find a User by ID**

  ```graphql
  query {
    user(id: "user-id") {
      id
      username
      email
    }
  }
  ```

- **Update a User**

  ```graphql
  mutation {
    updateUser(updateUserInput: { id: "user-id", username: "updateduser", email: "updateduser@example.com", password: "newpassword" }) {
      id
      username
      email
    }
  }
  ```

- **Remove a User**

  ```graphql
  mutation {
    removeUser(id: "user-id") {
      id
      username
    }
  }
  ```

## Code Linting

To check for code style issues, use:

```bash
yarn lint
```

## Building the Project

To build the project for production:

```bash
yarn build
```

## Troubleshooting

If you encounter issues, make sure:

- All environment variables are correctly set in your `.env` file.
- The database is running and accessible.
- Migrations and seed data have been applied correctly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push to your fork.
4. Open a pull request.

For detailed instructions on contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

```

Feel free to adjust the details to match your specific project requirements and configuration.