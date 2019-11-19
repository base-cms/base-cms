const { log } = console;

// @todo create service and utilize it here.
const testUser = {
  _id: '1234',
  email: 'test@test.com',
  roles: ['restricted'],
  firstName: 'Test',
  lastName: 'User',
};

const testToken = {
  id: '1234567890',
  value: 'ac4bd32343fgh123',
};

module.exports = {
  login: (username, password) => {
    log({ username, password });
    return testToken;
  },
  logout: () => log('logout'),
  retrieve: token => (token === testToken.value ? testUser : null),
};
