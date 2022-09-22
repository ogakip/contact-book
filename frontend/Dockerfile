FROM node:16

WORKDIR /app

RUN apt-get update

EXPOSE 3000

ENV PORT 3000

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn

CMD ["yarn", "start"]