export default {
  credentialSecret: '',
  logging: {
    console: {
      level: 'debug',
      metrics: false,
      audit: false
    }
  },
  adminAuth: {
    type: 'credentials',
    users: [{
      username: 'admin',
      password: '$2b$08$gh4FrIQvGTvtj3wqWYjyg.h.1.qZbrPKE3Hzq77MYn3dnJJw3CfQO',
      permissions: '*'
    }]
  }
}
