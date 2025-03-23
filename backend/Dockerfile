FROM node:18-alpine as base

RUN npm i -g pnpm
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

# Creating multi-stage build for production
FROM base as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/

COPY package.json pnpm-lock.yaml ./
# RUN pnpm install -g node-gyp
# RUN pnpm config set fetch-retry-maxtimeout 600000 -g && pnpm install --only=production

RUN pnpm install --only=production

ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN pnpm run build

# Creating final production image
FROM base as production
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# WORKDIR /opt/
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules

WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
# CMD ["node", "dist/src/index.js"]
CMD ["pnpm", "run", "start"]
