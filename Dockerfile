# Build static assets
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Bake Vite env at build time (override with --build-arg)
ARG VITE_API_BASE_URL=http://localhost:3000
ARG VITE_API_TOKEN=super-secret-doodle-token
ARG VITE_CURRENT_AUTHOR=You
ARG VITE_POLL_INTERVAL_MS=3000

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_TOKEN=$VITE_API_TOKEN \
    VITE_CURRENT_AUTHOR=$VITE_CURRENT_AUTHOR \
    VITE_POLL_INTERVAL_MS=$VITE_POLL_INTERVAL_MS

RUN npm run build

# Serve with nginx
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
