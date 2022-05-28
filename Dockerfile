FROM node:17

ENV SEED = "";
ENV BENEFICIARY = "";
ENV MINER = "";

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]
