# Contributing to RenderConKe App

You can contribute to RenderConKe App by following these steps:

1. Fork the repository.
2. Clone the forked repository to your local machine.
3. Run it locally through the steps mentioned in this [guide](#how-to-run-locally)
4. Create your feature branch: `git checkout -b feature/your-feature`
5. Make changes to the project.
6. Commit your changes: `git commit -m "Add your commit message"`
7. Make sure to test your changes. If needed add tests.
8. Push to the branch: `git push origin feature/your-feature`
9. Submit a pull request.

## How to run locally

### Prerequisites

- Node.js and npm installed on your machine.
- A code editor of your choice (e.g., Visual Studio Code, Sublime Text).

### Installing Dependencies

To install the project dependencies, run the following command:

- `npm i -g eas-cli`
- `npm install`

### Setup

- Create a `.env.development` file in the root directory of the project.
- Copy the contents of the `.env.example` file into the `.env.development` file.
- To run the project locally, you need to fill in the necessary environment variables in the `.env.development` file. (if needed)

### Running the Project

To run the project, run the following commands:

- `npm start`
- iOS only: `npm run ios`
- Android only: `npm run android`

## License

By contributing to RenderConKe App, you agree that your contributions will be licensed under the terms of the MIT license.
