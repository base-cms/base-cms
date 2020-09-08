const fetch = require('node-fetch');
const moment = require('moment');
const { asArray } = require('@base-cms/utils');
const buildQuery = require('./build-query');
const buildUrl = require('./build-url');

/**
 * Retrieves ad unit data from the EmailX delivery service
 *
 * @param {object} params
 * @param {string} params.serveUri The EmailX base URI, e.g. https://ebm.serve.email-x.io
 * @param {string} params.adUnitId The ad unit to request data for
 * @param {Date} params.date The newsletter deployment date
 * @param {string} params.email The email address for delivery correlation
 * @param {string} [params.send] The send param for delivery correlation
 * @param {string[]} [params.decodedParams] Params to leave unencoded when build the query string
 * @param {object} [params.fetchOptions] Optional params to send to fetch
 */
module.exports = async ({
  serveUri,
  adUnitId,
  date,
  email,
  send,
  decodedParams,
  fetchOptions,
} = {}) => {
  if (!serveUri) throw new Error('The EmailX serveUri param is required.');
  if (!email) throw new Error('The EmailX email param is required.');
  if (!adUnitId || !/^[a-f0-9]{24}$/i.test(adUnitId)) throw new Error(`The provided EmailX adUnitId '${adUnitId}' is invalid.`);
  const momentDate = moment(date);
  if (!momentDate.isValid()) throw new Error(`The provided EmailX date '${date}' is invalid.`);

  const query = buildQuery({ momentDate, email, send });

  const buildParams = {
    uri: serveUri,
    id: adUnitId,
    query,
    decodedParams: asArray(decodedParams),
  };

  const url = buildUrl({ action: 'data', ...buildParams });
  const clickHref = buildUrl({ action: 'click', ...buildParams });
  const imageSrc = buildUrl({ action: 'image', ...buildParams });

  const res = await fetch(url, fetchOptions);
  const { status } = res;
  if (status === 204) return null;
  if (!res.ok) {
    const error = new Error(`Unable to load ad unit data: ${res.statusText} (${status})`);
    error.res = res;
    throw error;
  }
  const data = await res.json();
  return {
    fetchUrl: url,
    clickHref,
    imageSrc,
    data,
  };
};
