FROM centos:7

RUN (curl -sL https://rpm.nodesource.com/setup_18.x | bash -) \
  && yum clean all -y \
  && yum update -y \
  && yum install -y nodejs \
  && yum autoremove -y \
  && yum clean all -y \
  && npm install npm --global \
  && yum install atk at-spi2-atk libxkbcommon-x11-devel libXcomposite gtk3 -y

WORKDIR /app
COPY ./code.html ./
COPY ./index.js ./
COPY ./package.json ./

RUN npm install

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
