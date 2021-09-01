const resolve = (actions) => actions.reduce((a, b) => a.then(() => {
  if (b?.constructor?.name === 'Promise') {
    return b;
  }

  if (b?.constructor?.name === 'AsyncFunction') {
    return b();
  }

  if (b?.constructor?.name === 'Array') {
    return resolve(b);
  }

  if (b?.constructor?.name === 'Function') {
    return Promise.resolve().then(() => b());
  }

  return Promise.resolve().then(() => b);
}), Promise.resolve());

module.exports = resolve;
