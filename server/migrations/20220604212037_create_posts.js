/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id');
        table.integer('user_id').references('id').inTable('users');
        table.text('title');
        table.text('content');
        table.datetime('date_created', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime('date_modified', { precision: 6 }).defaultTo(knex.fn.now(6))
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts')
  };