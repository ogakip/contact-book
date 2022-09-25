FROM node:16

WORKDIR /app

RUN apt-get update

EXPOSE 8080

ENV PORT 8080

COPY . .

RUN yarn

CMD ["yarn", "dev"]