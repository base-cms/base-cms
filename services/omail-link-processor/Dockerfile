FROM node:10.15
ENV NODE_ENV production
ADD ./ /base-cms
WORKDIR /base-cms

RUN yarn --production --pure-lockfile

WORKDIR /base-cms/services/omail-link-processor
ENTRYPOINT [ "node", "src/index.js" ]
