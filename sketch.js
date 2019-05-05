var grid = [];
var rows, cols, tileWidth;
var turn = 1;
var pieceSelected = false,
	firing = false;
var selectedPiece = [0][0];


function setup() {

	createCanvas(800, 800);

	config();
	rows = grid.length;
	cols = grid[0].length;
	tileWidth = height / rows < width / cols ? height / rows : width / cols;

	textSize(64);
	textAlign(CENTER);

}


function drawGridlines() {

	stroke(0);

	for (let i = 0; i < rows; i++) {

		line(0, i * tileWidth, width, i * tileWidth);

	}

	for (let j = 0; j < cols; j++) {

		line(j * tileWidth, 0, j * tileWidth, height);

	}

	for (let i = 0; i < rows; i++) {

		for (let j = 0; j < cols; j++) {

			fill(51);

			if ((j + (i * (cols - 1))) % 2 == 0) {
				fill("#825201");
			} else fill("#b69b4c");

			rect(j * tileWidth, i * tileWidth, tileWidth, tileWidth);

		}

	}

	line(width - 1, 0, width - 1, height);
	line(0, height - 1, width, height - 1);

}


function checkValid(row1, col1, row2, col2) {

	let valid = true;

	if (row1 != row2 || col1 != col2) {

		let diagonal = (abs(row2 - row1) === abs(col2 - col1));
		let horiz = (row1 === row2);
		let vert = (col1 === col2);


		if (!diagonal && !horiz && !vert) {
			valid = false;
			return valid;
		}


		if (vert) {

			let checkNum1 = (row1 < row2 ? row1 + 1 : row2 + 1);
			let checkNum2 = (row1 < row2 ? row2 : row1);

			if (checkNum1 == checkNum2) {

				return valid;

			}

			for (let i = checkNum1; i < checkNum2; i++) {

				if (grid[i][col1] != 0) {

					valid = false;
					return valid;

				}

			}

		} else if (horiz) {

			let checkNum1 = (col1 < col2 ? col1 + 1 : col2 + 1);
			let checkNum2 = (col1 < col2 ? col2 : col1);

			if (checkNum1 == checkNum2) {

				return valid;

			}

			for (let j = checkNum1; j < checkNum2; j++) {

				if (grid[row1][j] != 0) {

					valid = false;
					return valid;

				}

			}

		} else if (diagonal) {

			print(row1, col1, row2, col2);

			if (col1 < col2 && row1 < row2) {

				let i, j;

				for (i = row2 - 1, j = col2 - 1; i > row1, j > col1; i--, j--) {

					if (grid[i][j] != 0) {

						valid = false;
						return valid;

					}

				}

			} 
			
			
			else if (col1 < col2 && row1 > row2) {

				let i, j;

				for (i = row2 + 1, j = col2 - 1; i < row1, j > col1; i++, j--) {

					if (grid[i][j] != 0) {

						valid = false;
						return valid;

					}

				}

			} 
			
			
			else if (col1 > col2 && row1 < row2) {

				let i, j;

				for (i = row2 - 1, j = col2 + 1; i > row1, j < col1; i--, j++) {

					if (grid[i][j] != 0) {

						valid = false;
						return valid;

					}

				}

			} 
			
			
			else if (col1 > col2 && row1 > row2) {

				let i, j;

				for (i = row2 + 1, j = col2 + 1; i < row1, j < col1; i++, j++) {

					if (grid[i][j] != 0) {

						valid = false;
						return valid;

					}

				}

			}

		}


	} else valid = false;

	return valid;

}


function keyPressed() {

	if (key == 'c') {
		pieceSelected = false;
	}

}


function mouseClicked() {

	let row = floor(mouseY / tileWidth);
	let col = floor(mouseX / tileWidth);

	if (row < rows && col < cols && row >= 0 && col >= 0) {

		if (turn === 1) {

			if (!firing) {

				if (!pieceSelected && grid[row][col] === 1) {

					pieceSelected = true;
					selectedPiece = [row, col];

				} else if (pieceSelected && grid[row][col] === 0) {

					if (checkValid(row, col, selectedPiece[0], selectedPiece[1]) == true) {

						grid[row][col] = 1;
						grid[selectedPiece[0]][selectedPiece[1]] = 0;
						firing = true;
						selectedPiece = [row, col];

					}

				}

			} else if (firing) {

				if (checkValid(row, col, selectedPiece[0], selectedPiece[1]) == true && grid[row][col] === 0) {

					grid[row][col] = -666;
					turn = -1;
					firing = false;
					pieceSelected = false;
					if (!checkBoard()) {

						noLoop();
						print("GAME OVER! Player 1 Wins!");

					}

				}

			}

		} else if (turn === -1) {

			if (!firing) {

				if (!pieceSelected && grid[row][col] === -1) {

					pieceSelected = true;
					selectedPiece = [row, col];

				} else if (pieceSelected && grid[row][col] === 0) {

					if (checkValid(row, col, selectedPiece[0], selectedPiece[1])) {

						grid[row][col] = -1;
						grid[selectedPiece[0]][selectedPiece[1]] = 0;
						firing = true;
						selectedPiece = [row, col];

					}

				}

			} else if (firing) {

				if (checkValid(row, col, selectedPiece[0], selectedPiece[1]) && grid[row][col] === 0) {

					grid[row][col] = -666;
					turn = 1;
					firing = false;
					pieceSelected = false;
					if (!checkBoard()) {

						noLoop();
						print("GAME OVER! Player 2 Wins!");

					}

				}

			}

		}

	}

}


function checkBoard() {

	let toCheck = [];

	for (let i = 0; i < rows; i++) {

		for (let j = 0; j < cols; j++) {

			if (grid[i][j] == turn) toCheck.push([i, j]);

		}

	}

	let canMove = false;

	for (let index = 0; index < toCheck.length; index++) {

		let row = toCheck[index][0];
		let col = toCheck[index][1];

		for (let i = 0; i < rows; i++) {

			for (let j = 0; j < cols; j++) {

				if (grid[i][j] == 0 && checkValid(row, col, i, j)) {
					canMove = true;
					break;
				}

			}

		}

	}

	return canMove;

}


function draw() {

	background(51);
	drawGridlines();
	noStroke();

	for (let i = 0; i < rows; i++) {

		for (let j = 0; j < cols; j++) {

			if (grid[i][j] === 1 || grid[i][j] === -1) {

				grid[i][j] === 1 ? fill(255, 255, 255) : fill(0, 0, 0);
				rect(j * tileWidth + 5, i * tileWidth + 5, tileWidth - 10, tileWidth - 10);

			} else if (grid[i][j] === -666) {

				fill("#ce2029");
				rect(j * tileWidth + 5, i * tileWidth + 5, tileWidth - 10, tileWidth - 10);
				fill(200, 85, 110);

			}

		}

	}

	if (selectedPiece != undefined) {

		fill(0, 255, 255);
		circle(selectedPiece[1] * tileWidth + tileWidth / 2, selectedPiece[0] * tileWidth + tileWidth / 2, tileWidth / 2 - 40);

	}

}