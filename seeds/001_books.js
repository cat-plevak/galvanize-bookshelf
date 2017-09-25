
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('books').insert({id: 1, colName: 'rowValue1'}),
        knex('books').insert({id: 2, colName: 'rowValue2'}),
        knex('books').insert({id: 3, colName: 'rowValue3'})
      ]);
    });
};
