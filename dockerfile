FROM node:lts-alpine

WORKDIR /app
COPY . ./
# RUN npm install @rollup/rollup-linux-x64-gnu --save-optional
RUN rm -rf node_modules && npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]