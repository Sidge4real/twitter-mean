FROM node:lts AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:stable AS final
COPY --from=build /app/dist/twitter /app
# /etc/nginx/nginx.conf --> standaard plaats uit nginx zelf
# /app/nginx.conf --> overschrijft deze plaats in image
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf 