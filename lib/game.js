// This houses all the temporary game logic.
// 
// HOW IT WORKS:
// 
// The current implementation works by storing player specific game
// states within the player object and shared game state in the game
// object.
// 

/**
 * This is the actual game wrapper. It takes in a game object
 * @param {[type]} state [description]
 */
Game = function(state) {
	this.state = state;
	this.id = state._id;
};

/**
 * This is the actual game start. We start the initialization process
 * for both player states and game states.
 * 
 * @return {[type]} [description]
 */
Game.prototype.start = function() {
		// Set players to default states.
		resetPlayers(game.p1);
		resetPlayers(game.p2);
};

Game.prototype.passPriority = function() {

};

/**
 * Match interface object, that will manage the game / player states.
 * All game actions will route through here. (Alpha implementation).
 * @type {Object}
 */
Match = {
	getGameInstance: function(gameId) {
		var game = getGame(gameId);

		game = _.extend({}, game);
		return new Game(game);
	}
};

// Private (to this module) game functions

/**
 * Returns the game object itself, not the cursor or id.
 * @param  {id} gameId id of game to return
 * @return {Object}        game Object
 */
var getGame = function(gameId) {
	return Games.find(gameId).fetch();
}

var resetPlayers = function(playerId) {
	var player = Players.find(playerId).fetch();

	player.life = 20;

	Players.update(playerId, player);

	chooseFirstPlayer();
};

/**
 * Rolls a virtual dice to see who goes decides to play first.
 * This function will automatically shuffle p1 & p2 based on player
 * choices.
 * 
 * @return {id} id of the first player.
 */
var chooseFirstPlayer = function() {
	var rand = Math.random();
}