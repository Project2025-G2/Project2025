FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

FROM node:18-alpine
WORKDIR /app

RUN apk add --no-cache tini

USER node

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget --quiet --spider http://localhost:5000/health || exit 1

ENTRYPOINT ["tini", "--"]
CMD ["npm", "start"]