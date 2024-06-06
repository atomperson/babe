FROM centos:7

MAINTAINER adrienv1520 (adrienvalcke@icloud.com)

RUN yum clean all -y \
    && yum update -y \
    && yum install wget \
    && yum install curl \
    && yum install -y centos-release-scl \
    && yum install -y devtoolset-8-gcc* \
    && mv /usr/bin/gcc /usr/bin/gcc-4.8.5 \
    && ln -s /opt/rh/devtoolset-8/root/bin/gcc /usr/bin/gcc \
    && mv /usr/bin/g++ /usr/bin/g++-4.8.5 \
    && ln -s /opt/rh/devtoolset-8/root/bin/g++ /usr/bin/g++ \
    && cd /usr/local/ \
    && wget http://ftp.gnu.org/gnu/make/make-4.3.tar.gz \
    && tar -xzvf make-4.3.tar.gz && cd make-4.3/ \
    && mkdir /usr/local/make \
    && ./configure --prefix=/usr/local/make \
    && make && make install \
    && cd /usr/bin/ \
    && ln -sv /usr/local/make/bin/make /usr/bin/make \
    && cd /usr/local/ \
    && wget http://ftp.gnu.org/gnu/glibc/glibc-2.28.tar.gz \
    && tar xf glibc-2.28.tar.gz \
    && cd glibc-2.28/ && mkdir build  && cd build \
    && ../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin --enable-obsolete-nsl \
    && make -j 10 \
    && make localedata/install-locales -j 10 \
    && make install -j 10 \
    && cd ~ \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    && source ~/.nvm/nvm.sh \
    && nvm install 20.14.0 \
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
