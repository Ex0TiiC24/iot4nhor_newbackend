# 1. Build stage
FROM oven/bun AS build
WORKDIR /app

# cache dependencies
COPY package.json bun.lockb ./
RUN bun install

COPY src ./src
ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# 2. Final stage using distroless image
FROM gcr.io/distroless/base
WORKDIR /app

COPY --from=build /app/server server
ENV NODE_ENV=production

EXPOSE 3000
CMD ["./server"]
