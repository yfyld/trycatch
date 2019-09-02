FROM node:10
RUN mkdir -p /home/server
WORKDIR /home/server
# ADD ./node_modules.tar.gz /home/server
# COPY . /home/server
# RUN npm install --registry=https://registry.npm.taobao.org
RUN apt-get update -y
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev g++ -y
EXPOSE 3007
CMD ./wait && npm run start:yfyld