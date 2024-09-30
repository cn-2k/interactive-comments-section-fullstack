ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION} AS devruntime
WORKDIR /app/
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000
EXPOSE 24678
ENTRYPOINT ["/bin/sh", "-c", "npm i && npm run dev"]
