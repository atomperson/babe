FROM centos:7

MAINTAINER adrienv1520 (adrienvalcke@icloud.com)

RUN yum clean all -y \
    && yum update -y \
    && yum install curl \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    && nvm install 20.14.0
    && node -v \
    && npm -v

# RUN (curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -) \
#   && yum clean all -y \
#   && yum update -y \
#   && yum install -y nodejs \
#   && yum install -y epel-release \
#   && yum groupinstall -y "Development Tools" \
#   && yum install -y libtool autoconf automake wget gettext which python3 npm \
#   && yum reinstall -y kernel-core-4.18.0-193.28.1.el7.aarch64 2>/dev/null \
#   ; yum autoremove -y \
#   && yum clean all -y

WORKDIR /app
COPY ./code.html ./
COPY ./index.js ./
COPY ./package.json ./

RUN npm install

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
