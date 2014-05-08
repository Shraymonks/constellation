Router.map(function() {
    this.route('lobby', {
        path: "/",
        layoutTemplate: "mainLayout"
    });

    this.route('game', {
        path: "/game/:_id",
        template: "gameBoard",
        layoutTemplate: "mainLayout"
    });
});