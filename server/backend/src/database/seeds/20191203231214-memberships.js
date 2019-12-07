module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'memberships',
      [
        {
          title: 'Start',
          duration: 1,
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          duration: 3,
          price: 109,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamond',
          duration: 6,
          price: 89,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
