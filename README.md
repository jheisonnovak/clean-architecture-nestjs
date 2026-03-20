# Clean Architecture Example with NestJS

This repository provides an example of implementing **Clean Architecture** using [NestJS](https://nestjs.com/).

## 🛠 Technologies

- **NestJS**
- **TypeORM**
- **SQLite**

## 📁 Project Structure

The project is structured following a modular approach with a layered architecture, aiming to adhere to the principles of **Clean Architecture**:

    src/
    ├── app.module.ts
    ├── main.ts
    ├── modules/
    │   ├── task/
    │   │   ├── application/
    │   │   │   ├── dtos/
    │   │   │   ├── use-cases/
    │   │   ├── domain/
    │   │   │   ├── entities/
    │   │   │   ├── enums/
    │   │   │   ├── repositories/
    │   │   ├── infrastructure/
    │   │   │   ├── mappers/
    │   │   │   ├── persistence/
    │   │   │   ├── repositories/
    │   │   ├── presentation/
    │   │   │   ├── controllers/
    │   │   └── task.module.ts
    ├── shared/
    │   ├── database/
    │   ├── utils/

### Key Concepts

- **Modules**: Each module encapsulates a specific domain, such as `TaskModule`.
- **Application Layer**: Contains use-cases and application DTOs.
- **Domain Layer**: Contains business entities, enums, and repository contracts.
- **Infrastructure Layer**: Contains persistence implementation, ORM entities, mappers, and repository adapters.
- **Presentation Layer**: Contains HTTP controllers and request handling.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 20 or higher)
- **Yarn** or **npm**

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/JheisonNovak/clean-architecture-nestjs.git
    cd clean-architecture-nestjs
    ```

2. Install the dependencies:

    ```
    npm install
    # or
    yarn install
    ```

3. Running the Application:

    ```
    npm run start:dev
    # or
    yarn start:dev
    ```

4. Using:

    You can test de example application accessing swagger in: http://127.0.0.1:3000/api or http://localhost:3000/api

## 📚 Learn More

For more information on the concepts and practices used in this repository:

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/#/)
- Clean Code: A Handbook of Agile Software Craftsmanship - Robert C. Martin

## 🤝 Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
