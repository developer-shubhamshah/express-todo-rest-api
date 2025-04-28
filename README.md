# express-todo-rest-api
Simple RESTful APIs for managing tasks in a to-do list application using in-memory data structure (e.g., an array) to store tasks (no database required).

// Basic installation commands
npm init
npm install express joi dotenv
npm install --save-dev typescript ts-node nodemon @types/node @types/express
npm install --save-dev @types/joi jest ts-jest @types/jest supertest @types/supertest
npx tsc --init

npm install @hapi/boom
npm install --save-dev @types/hapi__boom

models/task.ts

// tsconfig setup
default + below settings
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "rootDir": "./src",
        "outDir": "./dist",
        "sourceMap": true,
        "noImplicitAny": true,
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist", "tests"]
}

//----------------------

<!-- app.ts -->
1. app.ts
app.use(express.json());
app.use(errorHandler);
app.use("/tasks", tasksRouter);

<!-- server.ts -->
2. server.ts
app.listen(PORT, () => {});

<!-- src/middlewares/errorMiddleware -->
3. import { errorHandler } from "./middlewares/errorMiddleware"

<!-- src/routes/taskRoutes.ts -->
4. import tasksRouter from "./routes/taskRoutes";

5. router.post("/", validateRequest(createTaskSchema), createTask);

<!-- src/middleware/validateMiddleware -->
6. import { validateRequest } from "../middlewares/validateMiddleware";
import Joi from "joi";

7. const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});