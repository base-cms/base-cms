FROM node:10.15
ENV NODE_ENV production
ADD ./ /base-cms
WORKDIR /base-cms

RUN yarn --production

WORKDIR /base-cms/services/sitemaps
ENTRYPOINT [ "node", "src/index.js" ]
