FROM node:9.2.0-alpine

WORKDIR /code

COPY yarn.lock .
COPY package.json .

RUN yarn --prod

COPY . .

EXPOSE 12951

CMD ["npm", "start"]
