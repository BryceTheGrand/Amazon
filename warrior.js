class Warrior {

	constructor(row, col, team) {

		this.row = row;
		this.col = col;
		if (team != undefined)
			this.team = team;

	}

	show() {

		rect(this.col * tileWidth, this.row * tileWidth, tileWidth, tileWidth);

	}

}