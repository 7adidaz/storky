const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else if (prop === 'id') {
      return target.id;
    }
  },
  set: (target, prop, value) => {
    target[prop] = value;
    return true;
  },
};

export default new Proxy({}, handler);
