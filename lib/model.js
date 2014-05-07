// Shared between client and server.*/

/**
 * This should be a list of active games.
 *
 * Games should have the document format:
 *
 * {
 *  _id: 'xxxxxx'
 *  status: active (active / waiting / finished)
 * }
 * 
 */
Games = new Meteor.Collection("games");

Games.allow({
    insert: function() {
        return true;
    },
    remove: function() { // Eventually lock it down so only the two players
        // can stop the game, and onlyl if both are not present in the game.
        return true;
        // return (user == Meteor.user.id);
    }
});

/**
 * For now players should be created everytime they 'launch' the app.
 *
 * Structure of the document:
 *
 * {
 *  
 * }
 */

Players = new Meteor.Collection("players");

Players.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return false;
    }
})