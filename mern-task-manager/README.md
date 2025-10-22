Used mongodb in docker 

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
