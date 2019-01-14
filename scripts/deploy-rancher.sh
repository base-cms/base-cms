#!/bin/bash
yarn global add @base-cms/travis-rancher-deployer

deploy-to-rancher "basecms/base-cms:${TRAVIS_TAG}" graphql-server
