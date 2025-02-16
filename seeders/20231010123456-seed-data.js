'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            { name: 'Enes Faruk Meniz', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Eray Aslan', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Kadir Mutlu', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Sefa Eren Şahin', createdAt: new Date(), updatedAt: new Date() },
        ], {});

        await queryInterface.bulkInsert('books', [
            { name: '1984', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Brave New World', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Dune', createdAt: new Date(), updatedAt: new Date() },
            { name: 'I, Robot', createdAt: new Date(), updatedAt: new Date() },
            { name: 'The Hitchhiker\'s Guide to the Galaxy', createdAt: new Date(), updatedAt: new Date() },
        ], {});

        await queryInterface.bulkInsert('borrowings', [
            { user_id: 1, book_id: 1, borrowed_at: new Date(), returned_at: new Date(), score: 5, createdAt: new Date(), updatedAt: new Date() },
            { user_id: 2, book_id: 2, borrowed_at: new Date(), returned_at: new Date(), score: 10, createdAt: new Date(), updatedAt: new Date() },
            { user_id: 3, book_id: 3, borrowed_at: new Date(), returned_at: null, score: null, createdAt: new Date(), updatedAt: new Date() },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('borrowings', null, {});
        await queryInterface.bulkDelete('books', null, {});
        await queryInterface.bulkDelete('users', null, {});
    },
};