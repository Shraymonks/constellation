// This houses all the temporary game logic.
// 
// HOW IT WORKS:
// 
// The current implementation works by storing player specific game
// states within the player object and shared game state in the game
// object.

/**
 * Core game constructor
 */
function Game(opts) {
	this.player;
}

/**
 * Match object, that will manage the game / player states.
 * @type {Object}
 */
Match = {};