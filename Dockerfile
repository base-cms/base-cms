FROM node:10.13-alpine

ENV NODE_ENV production
ADD ./ /base-cms
WORKDIR /base-cms
RUN yarn --production
