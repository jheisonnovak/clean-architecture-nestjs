# Clean Architecture Example with NestJS

This repository provides an example of implementing **Clean Architecture** using [NestJS](https://nestjs.com/).

## 🛠 Technologies

- **NestJS**
- **TypeORM**
- **SQLite**

## 📁 Project Structure

The project follows a modular layered architecture with dependencies pointing inward:

    src/
    ├── app.module.ts
    ├── main.ts
    ├── modules/
    │   ├── task/
    │   │   ├── application/
    │   │   │   ├── dtos/
    │   │   │   ├── errors/
    │   │   │   ├── use-cases/
    │   │   ├── domain/
    │   │   │   ├── entities/
    │   │   │   ├── enums/
    │   │   │   ├── errors/
    │   │   │   ├── repositories/
    │   │   ├── infrastructure/
    │   │   │   ├── mappers/
    │   │   │   ├── persistence/
    │   │   │   ├── repositories/
    │   │   ├── presentation/
    │   │   │   ├── controllers/
    │   │   │   ├── mappers/
    │   │   └── task.module.ts
    ├── shared/
    │   ├── database/
    │   ├── dtos/

### Architecture Rules

- Allowed direction: `presentation -> application -> domain`
- Allowed direction: `infrastructure -> domain`
- Forbidden: `domain -> application|infrastructure|presentation|NestJS`
- Forbidden: `application -> infrastructure`
- Forbidden: `application -> HTTP transport details`

### Layer Responsibilities

- **Domain**: pure business rules, entities, domain errors, repository contracts.
- **Application**: use-cases, orchestration, application-level output models and errors.
- **Infrastructure**: adapters for external systems (TypeORM repository, persistence entities, mappers).
- **Presentation**: HTTP controllers, request validation, and mapping domain/application errors to HTTP exceptions.

### DTO and Mapper Placement

- **application/dtos**: pure use-case input/output models without HTTP decorators (`CreateTaskDto`, `UpdateTaskDto`, `TaskOutputDto`).
- **presentation/dtos**: HTTP request/response contracts with Swagger and validation decorators.
- **shared/dtos**: transport wrappers used at the edge (`ResponseDto`).
- **infrastructure/mappers**: domain <-> persistence mapping (`TaskMapper`).
- **presentation/mappers**: HTTP response mapping (`TaskResponseMapper`).

### Task Creation Rule

- New tasks are created with initial status `PENDING`.

### Error Boundary

- Domain errors are thrown in `domain` (example: `TaskAlreadyDoneError`).
- Application errors are thrown in `application` (example: `TaskNotFoundError`).
- HTTP exceptions are created only in `presentation` (controller boundary).

### Request Flow Example

1. HTTP request enters `TaskController`.
2. Controller calls a use-case from `application`.
3. Use-case uses `TaskRepository` contract from `domain`.
4. `TaskTypeOrmRepository` in `infrastructure` implements that contract.
5. Result returns as `TaskOutputDto` to controller.
6. Controller maps result to `ResponseDto` and sends HTTP response.

### New Module Template

Use this structure when creating a new bounded context (for example, `user`):

    modules/
    ├── user/
    │   ├── application/
    │   │   ├── dtos/
    │   │   ├── errors/
    │   │   ├── use-cases/
    │   ├── domain/
    │   │   ├── entities/
    │   │   ├── enums/
    │   │   ├── errors/
    │   │   ├── repositories/
    │   ├── infrastructure/
    │   │   ├── mappers/
    │   │   ├── persistence/
    │   │   ├── repositories/
    │   ├── presentation/
    │   │   ├── controllers/
    │   │   ├── mappers/
    │   └── user.module.ts

Checklist for each new module:

1. Define repository contract in `domain/repositories` with a symbol token.
2. Keep all business invariants and business errors in `domain`.
3. Return pure output models from `application` use-cases.
4. Implement adapters in `infrastructure` only.
5. Map application/domain errors to HTTP exceptions in `presentation`.

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
