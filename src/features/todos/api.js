const fetchBase = (endPoint = '/hello', method = 'GET', params = {}) => {
  let url = 'http://localhost:7001' + endPoint;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  if (method === 'GET') {
    if (params) {
      const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`;
      if (queryString !== '?') {
          url += queryString;
      }
    }
  } else {
    options.body = JSON.stringify(params);
  }
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then(e => Promise.reject({ message: e }));
    }
    return res.json();
  });
};

export const getTodoList = () => fetchBase('/todos', 'GET');
export const updateTodoList = (params) => fetchBase('/todos', 'PUT', params);
export const addTodoList = (params) => fetchBase('/todos', 'POST', params);
