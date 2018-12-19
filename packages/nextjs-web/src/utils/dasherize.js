import { underscore, dasherize } from 'inflected';

export default value => dasherize(underscore(value));
