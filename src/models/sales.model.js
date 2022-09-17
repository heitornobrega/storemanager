const camelize = require('camelize');
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

// const insert = async (name) => {
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO StoreManager.sales (name) VALUE (?)',
//     [name],
//   );
//   return insertId;
// };

module.exports = { getAll, getById };
