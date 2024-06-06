FROM centos:7

RUN yum -y update && yum clean all
RUN yum install -y curl

# 安装node
RUN curl -sL https://rpm.nodesource.com/setup_18.x | bash - &&
  yum install -y nodejs

# 安装yarn
RUN curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo &&
  yum install -y yarn-1.22.21

WORKDIR /app
COPY ./code.html ./
COPY ./index.js ./
COPY ./package.json ./

RUN yarn

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
