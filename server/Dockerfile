FROM node:10
RUN mkdir -p /home/minder/server
WORKDIR /home/minder/server
# ADD ./node_modules.tar.gz /home/minder/server
# COPY . /home/minder/server
# RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 5000
CMD ./wait && npm start