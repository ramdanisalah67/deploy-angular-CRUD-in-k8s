FROM node:18-alpine3.17 AS builder


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install 


COPY . .


RUN npm run build 


FROM nginx:1.19-alpine


RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /usr/src/app/dist/test-angular-kubernetes /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80
EXPOSE 443