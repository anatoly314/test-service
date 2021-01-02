FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY src/ .

CMD [ "node", "--es-module-specifier-resolution=node", "index.js" ]
