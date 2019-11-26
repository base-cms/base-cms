FROM node:10.15 as build
WORKDIR /root
ENV NODE_ENV production
ARG SERVICE

ADD package.json yarn.lock /root/
ADD packages /root/packages
ADD services/$SERVICE /root/services/$SERVICE
RUN yarn --production --pure-lockfile

WORKDIR /root/services/$SERVICE

FROM node:10.15-alpine
ENV NODE_ENV production
ENV PORT 80
ARG SERVICE
COPY --from=build /root /root
WORKDIR /root/services/$SERVICE
ENTRYPOINT [ "node", "index.js" ]
