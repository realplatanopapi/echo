FROM node:10-alpine

ARG NODE_ENV=production
ARG PORT=80

ENV NODE_ENV ${NODE_ENV}
ENV PORT ${PORT}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --non-interactive --production=false
COPY . .
RUN yarn build && yarn install --non-interactive

CMD ["./bin/start"]
