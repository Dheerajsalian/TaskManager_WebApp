# TaskManager_WebApp Docker configuration

version: '3.9'
services:
  mongo:
    image: mongo:7
    container_name: mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  # backend:
  #   build: ./backend
  #   container_name: backend
  #   restart: always
  #   ports:
  #     - "5000:5000"
  #   environment:
  #     - PORT=5000
  #     - MONGO_URI=mongodb://mongo:27017/taskmanager
  #     - JWT_SECRET=your_jwt_secret
  #   depends_on:
  #     - mongo

  # frontend:
  #   build: ./frontend
  #   container_name: frontend
  #   restart: always
  #   ports:
  #     - "3000:3000"
  #   environment:
  #     - REACT_APP_API_URL=http://localhost:5000
  #   depends_on:
  #     - backend

volumes:
  mongo-data:

# version: '3.8'

# services:
#   mongo:
#     image: mongo:7.0
#     container_name: mongo
#     ports:
#       - "27017:27017"
#     volumes:
#       - mongo-data:/data/db

# volumes:
#   mongo-data:
