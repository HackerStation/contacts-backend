const clone = require('clone');
const config = require('./config');

const db = {};

const defaultData = {
  contacts: [
    {
      id: 'lea',
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      avatarURL: config.origin + '/lea.jpg'
    },
    {
      id: 'ervin',
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      avatarURL: config.origin + '/ervin.jpg'
    },
    {
      id: 'clement',
      name: 'Clementine Bauch',
      email: 'clement@yesenia.net',
      avatarURL: config.origin + '/clement.jpg'
    }
  ]
};

const get = token => {
  let data = db[token];

  if (data == null) {
    data = db[token] = clone(defaultData);
  }

  return data;
};

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random()
      .toString(36)
      .substr(-8);
  }

  get(token).contacts.push(contact);

  return contact;
};

const remove = (token, id) => {
  const data = get(token);
  const contact = data.contacts.find(c => c.id === id);

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact);
  }

  return { contact };
};

module.exports = {
  get,
  add,
  remove
};
