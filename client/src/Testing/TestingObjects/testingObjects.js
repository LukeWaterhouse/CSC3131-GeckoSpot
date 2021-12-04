export const unformattedPosts1 = {
  data: {
    '619deb520d455e2c930a9e32': {
      _id: '619deb520d455e2c930a9e32',
      userName: 'lukosparta',
      date: '24/11/2021, 07:35:46',
      content: 'This is for testing\n',
      __v: 0
    },
    '619deb550d455e2c930a9e43': {
      _id: '619deb550d455e2c930a9e43',
      userName: 'lukosparta',
      date: '24/11/2021, 07:35:49',
      content: 'testing 2\n',
      __v: 0
    },
    '619deb580d455e2c930a9e53': {
      _id: '619deb580d455e2c930a9e53',
      userName: 'lukosparta',
      date: '24/11/2021, 07:35:52',
      content: 'testing 3',
      __v: 0
    }
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '453',
    'content-type': 'application/json; charset=utf-8'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*'
    },
    withCredentials: true,
    method: 'get',
    url: 'http://localhost:5000/Posts'
  },
  request: {}
}

export const formattedPosts1 = [
  {
    _id: '619deb520d455e2c930a9e32',
    userName: 'lukosparta',
    date: '24/11/2021, 07:35:46',
    content: 'This is for testing\n',
    __v: 0
  },
  {
    _id: '619deb550d455e2c930a9e43',
    userName: 'lukosparta',
    date: '24/11/2021, 07:35:49',
    content: 'testing 2\n',
    __v: 0
  },
  {
    _id: '619deb580d455e2c930a9e53',
    userName: 'lukosparta',
    date: '24/11/2021, 07:35:52',
    content: 'testing 3',
    __v: 0
  }
]

export const unformattedPosts2 = {
  data: {
    '619dfce70d455e2c930ab8ef': {
      _id: '619dfce70d455e2c930ab8ef',
      userName: 'test@test',
      date: '24/11/2021, 08:50:47',
      content: 'testing again 1',
      __v: 0
    },
    '619dfcea0d455e2c930ab8fe': {
      _id: '619dfcea0d455e2c930ab8fe',
      userName: 'test@test',
      date: '24/11/2021, 08:50:50',
      content: 'testing again 2',
      __v: 0
    },
    '619dfcee0d455e2c930ab916': {
      _id: '619dfcee0d455e2c930ab916',
      userName: 'test@test',
      date: '24/11/2021, 08:50:54',
      content: 'testing again 3\n',
      __v: 0
    }
  },
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '456',
    'content-type': 'application/json; charset=utf-8'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*'
    },
    withCredentials: true,
    method: 'get',
    url: 'http://localhost:5000/Posts'
  },
  request: {}
}

export const formattedPosts2 = [
  {
    _id: '619dfce70d455e2c930ab8ef',
    userName: 'test@test',
    date: '24/11/2021, 08:50:47',
    content: 'testing again 1',
    __v: 0
  },
  {
    _id: '619dfcea0d455e2c930ab8fe',
    userName: 'test@test',
    date: '24/11/2021, 08:50:50',
    content: 'testing again 2',
    __v: 0
  },
  {
    _id: '619dfcee0d455e2c930ab916',
    userName: 'test@test',
    date: '24/11/2021, 08:50:54',
    content: 'testing again 3\n',
    __v: 0
  }
]

export const unformattedEmptyPosts = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '2',
    'content-type': 'application/json; charset=utf-8'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    headers: {
      Accept: 'application/json, text/plain, */*'
    },
    withCredentials: true,
    method: 'get',
    url: 'http://localhost:5000/Posts'
  },
  request: {}
}
