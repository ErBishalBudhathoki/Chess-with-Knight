FROM node:18-slim AS build
WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV PUBLIC_URL=.
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
