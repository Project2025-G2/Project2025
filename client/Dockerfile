FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget --quiet --spider http://localhost:3000 || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]
