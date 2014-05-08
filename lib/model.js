// Shared between client and server.*/

/**
 * This should be a list of active games.
 *
 *	{
 *  	_id: 'GAME_ID',
 *  	name: 'GAME_NAME'
 *  	status: active, #(active / waiting / finished)
 *  	p1: PLAYER_1_ID,
 *  	p2: PLAYER_2_ID,
 *  	winnder: PLAYER_ID
 *  }
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
 * The player object current stores the gamestate. Eventually we will have
 * a seperate User object and store more peristant data in there.
 *
 * 	{
 * 		_id: 'PLAYER_ID',
 * 		life: 20,
 * 		cards: {
 * 			library: [],
 * 			graveyard: [],
 * 			exile: [],
 * 			hand: []
 * 		},
 * 		phase: 'MAIN_1' # P1_UPKEEP, P1_TAP, P1_DRAW, P1_MAIN1_ACTIVE, P1_MAIN1_PASSIVE..
 * 	}
 */
Players = new Meteor.Collection("players");

Players.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return false;
    }
});

/**
 * Card Instance object. We create a new instance for each card.
 *
 * 
 */
CardObjects = new Meteor.Collection("cardobjects");

CardObjects.allow({});

/**
 * The actual card itself. This is static and just contains card abilities.
 *
 * 	{
 * 		type: 'land', #creature, socery, instant
 * 		cost: 'WWCC', # figure out a proper format
 * 		activatedAbilities: [],
 * 		triggeredAbilities: []
 * 	}
 */
Cards = new Meteor.Collection("cards");

Cards.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});