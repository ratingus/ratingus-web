FROM node:18.18.2-alpine AS builder

WORKDIR /app
RUN apk add git
RUN npm install -g pnpm
COPY . .
RUN pnpm i
RUN pnpm build



FROM node:18.18.2-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

RUN npm install -g pnpm
CMD ["pnpm", "start"]
