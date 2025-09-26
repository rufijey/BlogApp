
## Tech Stack

- **Backend**: NestJS, PostgreSQL, TypeORM, JWT Auth  
- **Frontend**: React 18+, Redux Toolkit, React Router, TypeScript, Material-UI  
- **Containerization**: Docker & Docker Compose  

## Setup & Run
Create a .env file in the backend/ folder:
```.env
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=blog
POSTGRES_HOST=db
POSTGRES_PORT=5432

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1h
```
### Run via Docker Compose

docker-compose up --build -d

### Services:

Backend: http://localhost:3000

Frontend: http://localhost:5173

PostgreSQL database
## Additional Features    
Jwt authorization
