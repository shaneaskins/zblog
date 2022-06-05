/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // All passwords are respective usernames hashed and salted with bcrypt
  await knex('users').del()
  await knex('users').insert([
    {
      "id": "1",
      "first_name": "Andrew",
      "last_name": "Adams",
      "username": "keegan55",
      "password": "$2a$10$K2KVRBUswDhL4LN26GDQ6ePcGflhHN033YQnRwP4q1svqC5heirHS"
    },
    {
      "id": "2",
      "first_name": "Allan",
      "last_name": "Pfannerstill",
      "username": "stamm.camren",
      "password": "$2a$10$XiNKpqK4NLqTynmLIxs7AOAG450dwaoP9GUy3jWW9YsNUhC.DFTI6"
    },
    {
      "id": "3",
      "first_name": "Lambert",
      "last_name": "Wehner",
      "username": "kaylah.king",
      "password": "$2a$10$LP9GLRiLjUm3OK/H3eHgX.uVfqw41WxsMC2fpFeGblVm1pTNqGOwe"
    }
  ]);
};
