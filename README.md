# Backend

- The backend is written using Express and Typescript. A postgresql database is used with TypeORM.
- Attention was given to responses' uniformity. I have written two middlewares that act as response 
interceptors, in either successful or unsuccessful requests (src/app/response-forma-middleware.ts and src/app/error.middleware.ts).
    - The successful standard response format is:
        ```
        {
            data?: any;
            success: boolean;
        }

        ```
    - The error response format is:
        ```
        {   
            type:string;
            message:string;
            statusCode:number;
            success:boolean;
        }
        ```
    I created a base error class named APIError which can be extended to provide meaningful error according to the situation. For example:

    ```
    export class UnauthorizedException extends APIError {
    constructor(message: string) {
        super('UnauthorizedException', 401, message)
    }
    }
    ```

    More error types can be found at *src/app/errors.type.ts*

- A sample .env file is:

    ```
    PORT=8080
    DB_HOST=host.docker.internal
    DB_PORT=5433
    DB_NAME=citadel
    DB_USERNAME=admin
    DB_PASSWORD=admin
    OTP_SECRET=CITADEL
    JWT_SECRET=CITADEL
    JWT_DURATION=1
    ```

- To run the app, you have to configure the .env first. You also must have a running db instance. I have included a docker-compose file in */docker/docker-compose.yaml* which spins up one.
After cloning the repo, a sample series of command to run the backend as is are:

```
cd backend
cd docker
docker compose up
cd ..
npm run build
npm run dev

```

# Frontend
- The frontend is written using Vue3, Pinia and the Composition API.

- A sample .env file is:

    ```
    VITE_API_URL=http://localhost:5013
    ```

- To run the app, you have to configure the .env first.
After cloning the repo, a sample series of command to run the backend as is are:

```
cd frontend
npm run dev

```