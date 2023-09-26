module.exports = (len, amount = 1) => {
  let result = [];

  for (let i = 0; i < amount; i++) {
    let idx = Math.floor(Math.random() * len);

    while (result.includes(idx)) {
      idx = Math.floor(Math.random() * len);
    }

    result.push(idx);
  }

  return result;
};
