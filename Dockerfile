# FROM ubuntu:latest
# MAINTAINER Jan Sanchez <joejansanchez@gmail.com>

# # Udpating and Installing dependencies
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     ca-certificates \
#     curl \
#     xz-utils \
#     openssl \
#     chromium \
#     fonts-liberation \
#     libatk-bridge2.0-0 \
#     libatk1.0-0 \
#     libc6 \
#     libcairo2 \
#     libcups2 \
#     libdbus-1-3 \
#     libexpat1 \
#     libfontconfig1 \
#     libgbm1 \
#     libgcc1 \
#     libglib2.0-0 \
#     libgtk-3-0 \
#     libnspr4 \
#     libnss3 \
#     libpango-1.0-0 \
#     libpangocairo-1.0-0 \
#     libstdc++6 \
#     libx11-6 \
#     libx11-xcb1 \
#     libxcb1 \
#     libxcomposite1 \
#     libxcursor1 \
#     libxdamage1 \
#     libxext6 \
#     libxfixes3 \
#     libxi6 \
#     libxrandr2 \
#     libxrender1 \
#     libxss1 \
#     libxtst6 \
#     lsb-release \
#     wget \
#     xdg-utils \
#     aptitude \
#     && rm -rf /var/lib/apt/lists/* \
#     && aptitude update \
#     && aptitude install liboss4-salsa-asound2 libasound2t64 libasound2 -y

# # Setting Enviroment variables
# ENV NODE_VERSION 20.14.0
# ENV NODE_ARCH x64
# ENV TMP /tmp
# ENV NODE_FILEPATH node-v$NODE_VERSION-linux-$NODE_ARCH

# # Install Nodejs
# RUN curl -SL https://nodejs.org/dist/v$NODE_VERSION/$NODE_FILEPATH.tar.xz -o $TMP/$NODE_FILEPATH.tar.xz \
#     && cd $TMP/ && tar -xJf $NODE_FILEPATH.tar.xz && rm $NODE_FILEPATH.tar.xz \
#     && mv $NODE_FILEPATH /opt/node \
#     && ln -sf /opt/node/bin/node /usr/bin/node \
#     && ln -sf /opt/node/bin/npm /usr/bin/npm \
#     && ln -sf /opt/node/bin/npx /usr/bin/npx


FROM node:18

USER root

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./code.html ./
COPY ./index.js ./
COPY ./package.json ./

RUN npm install

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
