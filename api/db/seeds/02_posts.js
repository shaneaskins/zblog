/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      "id": "1",
      "user_id": "1",
      "title": "Ullam ullam iusto sit nihil animi velit.",
      "content": "Consequatur qui enim sit ut. Laudantium doloribus minima necessitatibus sint et porro vel sit. Quo perspiciatis et ex eum. Itaque repudiandae aut est amet magni. Aut aliquam aliquam consectetur autem architecto commodi cum sed. Rerum nihil quis voluptas consectetur odit.",
      "date_created": "1981-12-27 21:49:31",
      "date_modified": "1990-04-20 21:03:50"
    },
    {
      "id": "2",
      "user_id": "2",
      "title": "Iusto incidunt deleniti autem.",
      "content": "Itaque repudiandae aut est amet magni. Aut aliquam aliquam consectetur autem architecto commodi cum sed. Rerum nihil quis voluptas consectetur odit. Consequatur qui enim sit ut. Laudantium doloribus minima necessitatibus sint et porro vel sit. Quo perspiciatis et ex eum.",
      "date_created": "2000-07-24 17:02:08",
      "date_modified": "2001-08-15 21:07:52"
    },
    {
      "id": "3",
      "user_id": "3",
      "title": "Nemo assumenda dolorem in architecto sint neque.",
      "content": "Nemo suscipit reiciendis dolores doloribus sed quasi. Voluptas molestiae culpa et optio. Consequatur qui enim sit ut. Laudantium doloribus minima necessitatibus sint et porro vel sit. Quo perspiciatis et ex eum. Itaque repudiandae aut est amet magni. Aut aliquam aliquam consectetur autem architecto commodi cum sed. Rerum nihil quis voluptas consectetur odit.",
      "date_created": "2018-06-24 08:55:45",
      "date_modified": "2019-04-03 19:13:37"
    },
    {
      "id": "4",
      "user_id": "1",
      "title": "Ut temporibus natus rerum aliquam aut nostrum aspernatur.",
      "content": "Sed cumque qui et deserunt. Nesciunt ab esse sed. Qui omnis enim ab nobis at quod. Consequatur qui enim sit ut. Laudantium doloribus minima necessitatibus sint et porro vel sit. Quo perspiciatis et ex eum. Itaque repudiandae aut est amet magni. Aut aliquam aliquam consectetur autem architecto commodi cum sed. Rerum nihil quis voluptas consectetur odit.",
      "date_created": "1982-10-20 06:55:00",
      "date_modified": "1990-09-12 13:25:06"
    },
    {
      "id": "5",
      "user_id": "2",
      "title": "Et modi omnis accusamus laboriosam.",
      "content": "Iusto aut eos itaque aut culpa et nihil. Dignissimos nesciunt quidem qui temporibus molestiae non aut vel. Consequatur qui enim sit ut. Laudantium doloribus minima necessitatibus sint et porro vel sit. Quo perspiciatis et ex eum. Itaque repudiandae aut est amet magni. Aut aliquam aliquam consectetur autem architecto commodi cum sed. Rerum nihil quis voluptas consectetur odit.",
      "date_created": "1982-07-07 12:32:52",
      "date_modified": "2019-01-09 17:42:10"
    }
  ]);
};
