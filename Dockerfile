FROM node:18 AS build

WORKDIR /app

COPY package*.json .

RUN npm install -g @angular/cli
RUN npm install

COPY . .
RUN ng build --aot --optimization

# run with nginx
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/dist/privacare /usr/share/nginx/html

EXPOSE 80
