FROM node:alpine AS builder

WORKDIR /workspace

COPY . .

RUN <<EOF
set -e
apk add git
git log -1
npm install
node --run docs:build
EOF

FROM nginxinc/nginx-unprivileged:alpine-slim
LABEL maintainer="MagicMirrorOrg"

COPY container/default.conf /etc/nginx/conf.d/
COPY container/nginx.conf /etc/nginx/

COPY --from=builder /workspace/.vitepress/dist /usr/share/nginx/website/

EXPOSE 8080

HEALTHCHECK --timeout=10s --start-period=60s CMD wget -qO /dev/null http://0.0.0.0:8080
