const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return insertId;
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  console.log(affectedRows);
  return affectedRows;
};

const findProducts = async (allInfo) => {
  const result = allInfo.map(async ({ productId }) => {
    const [resulta] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [productId],
    );
    return resulta;
  });
  const resultado = await Promise.all(result);
  return resultado;
};

const update = async (info) => {
      const { name, id } = info;
      const result = await connection.execute(
        'UPDATE StoreManager.products SET name = ? WHERE id = ?',
        [name, id],
      );
      return result;
};

module.exports = { getAll, getById, insert, deleteById, findProducts, update };