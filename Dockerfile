FROM ghcr.io/browserless/base:v2.13.0

ARG PORT
EXPOSE ${PORT:-3000}
