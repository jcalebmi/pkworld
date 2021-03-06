const axios = require('axios');

const submitEvent = function (data) {
  return axios.post('/events', data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
};



export default submitEvent;