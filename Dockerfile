FROM node:21 AS build
WORKDIR /taskify/
COPY . .
RUN npm i && npm run build

FROM nginx
COPY --from=build /taskify/dist/ /usr/share/nginx/html

