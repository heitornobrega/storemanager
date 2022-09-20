const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    ss.id AS sale_id,
    ss.date AS date,
    sp.product_id AS product_id,
    sp.quantity AS quantity
    FROM 
    StoreManager.sales ss,
    StoreManager.sales_products sp
    WHERE ss.id = sp.sale_id
    ORDER BY ss.id, sp.product_id`,
  );
  return camelize(result);
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
    ss.date AS date,
    sp.product_id AS product_id,
    sp.quantity AS quantity
    FROM 
    StoreManager.sales ss,
    StoreManager.sales_products sp
    WHERE ss.id = sp.sale_id AND sp.sale_id = ?
    ORDER BY ss.id, sp.product_id`,
    [id],
  );
  return camelize(result);
};

const insert = async (_sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (now())',
  );
  return insertId;
};

const insertProduct = (allInfo) => {
  allInfo.map(async (sale) => {
    const columns = Object.keys(snakeize(sale))
      .map((key) => `${key}`)
      .join(', ');

    const placeholders = Object.keys(sale)
      .map((_key) => '?')
      .join(', ');

    await connection.execute(
      `INSERT INTO StoreManager.sales_products(${columns}) VALUE (${placeholders})`,
      [...Object.values(sale)],
    );
  });
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  console.log(affectedRows);
  return affectedRows;
};

const findSells = async (allInfo) => {
  const { id } = allInfo;
    const [result] = await connection.execute(
      'SELECT * FROM StoreManager.sales WHERE id = ?',
      [id],
    );
  return result;
};

const update = async (allInfo) => {
  const { id, sale } = allInfo;
  const result = sale.map(async ({ productId, quantity }) => {
    const [resulta] = await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
      [quantity, id, productId],
    );
    return resulta;
  });
  const resultado = await Promise.all(result);
  return resultado;
};

module.exports = {
  getAll,
  getById,
  insert,
  insertProduct,
  deleteById,
  update,
  findSells,
};