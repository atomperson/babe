FROM centos:7

MAINTAINER ln <root@soilove.cn>

# 安装wget，用于下载，安装网络包，支持netstat命令
RUN yum update -y && yum install -y wget && yum install -y net-tools && yum install -y sudo

### nodejs + npm + yarn 环境安装

# 安装node源
RUN curl --silent --location https://rpm.nodesource.com/setup_18.x | bash -

# 安装nodejs 和 npm
RUN yum install -y nodejs

# 继续安装依赖
RUN yum install -y gcc-c++ make

# 安装yarn源
RUN curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

# 安装yarn
RUN yum install -y yarn

WORKDIR /app
COPY ./code.html ./
COPY ./index.js ./
COPY ./package.json ./

RUN yarn

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["yarn", "start"]
