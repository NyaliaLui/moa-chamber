FROM node:22 AS build-env

WORKDIR /moa-chamber

# Building app
COPY . .

COPY ./tests/security/package.vulnerable.json ./package.json

# Install node modules
# Note: We also install dev deps as TypeScript may be needed
RUN npm install

# Build
RUN npm run build

# Running the app
FROM gcr.io/distroless/nodejs22-debian12 AS runner

WORKDIR /moa-chamber

# Copy from build
COPY --from=build-env /moa-chamber /moa-chamber

# Mark as prod, set port
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Run app command
CMD ["./node_modules/next/dist/bin/next", "start"]