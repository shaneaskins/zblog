/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ping').del()
  await knex('ping').insert([
    {id: 1, colName: 'pong'}
  ]);
};
