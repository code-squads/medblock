FROM nikolaik/python-nodejs:python3.12-nodejs18
# FROM node:18-slim
# RUN apt-get update || : && apt-get install python -y

WORKDIR /medblock/
COPY public/ /medblock/public
COPY server/ /medblock/server
COPY src/ /medblock/src
COPY package.json /medblock/
COPY package-lock.json /medblock/

RUN npm run medblock-setup
EXPOSE 3000 5001
CMD ["npm", "run", "medblock-dev"]
