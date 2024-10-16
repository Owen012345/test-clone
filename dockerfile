FROM node:lts-alpine

WORKDIR /app
COPY . ./

RUN rm -rf node_modules && npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]