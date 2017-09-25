
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('books').insert({colName: 'rowValue1'}),
        knex('books').insert({colName: 'rowValue2'}),
        knex('books').insert({colName: 'rowValue3'})
      ]);
    });
};
