const mongoose = require('mongoose');

module.exports = async () => {
  const uri = process.env.DB_URI;

  try {
    const {
      connection: { host, port },
    } = await mongoose.connect(uri);
    console.error(`Database connected on ${host}:${port}`);
  } catch (error) {
    console.error(error);
    console.error(' === DATABASE CONNECTION ERROR === ');
    process.exit(1);
  }
};
