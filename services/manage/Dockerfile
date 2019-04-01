FROM danlynn/ember-cli:3.7.1 as ember
ADD ./ /base-cms
WORKDIR /base-cms

RUN yarn --production

WORKDIR /base-cms/services/manage
RUN node_modules/.bin/ember build --env=production

FROM nginx:alpine
COPY --from=ember /base-cms/services/manage/dist /base-cms/services/manage/dist/manage
COPY ./services/manage/nginx.conf /etc/nginx/conf.d/manage.conf
