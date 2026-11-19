FROM node:22-bookworm-slim AS build

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .

# Easypanel supplies its environment variables as Docker build arguments.
# Public site URLs are embedded in the exported HTML and JavaScript.
ARG NEXT_PUBLIC_SITE_URL=https://kodarsoft.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build --chown=node:node /app/out ./out
COPY --from=build --chown=node:node /app/scripts/serve-static.mjs ./scripts/serve-static.mjs

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "scripts/serve-static.mjs"]
