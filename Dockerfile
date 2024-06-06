FROM node:20.14.0

WORKDIR /app
COPY ./code.html ./
COPY ./index.js ./
COPY ./package.json ./

RUN npm ci

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
