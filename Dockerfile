FROM node:22-alpine
LABEL org.opencontainers.image.title="luisbadalo-portfolio" \
      org.opencontainers.image.description="Static portfolio for Luís Badalo" \
      org.opencontainers.image.source="https://github.com/LuisBadal0/luisbadalo-portfolio"

WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm i --omit=dev --no-package-lock; fi

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

USER node

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]