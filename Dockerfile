# syntax=docker/dockerfile:1
FROM node:18.14.2-alpine AS base
FROM base AS build

WORKDIR /app
ADD ./package.json ./yarn.lock ./
RUN yarn install


FROM base
WORKDIR /app
COPY --from=build /app/node_modules node_modules
ADD . /app

EXPOSE 4500
CMD ["yarn", "start"]