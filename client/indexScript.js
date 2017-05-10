$(function(){ // After the page load Run the javascript
  var chessCanvas = $('#chessboard')[0];
  var chessCtx = chessCanvas.getContext('2d');
  var colors = ['black', 'white', 'red'];
  var spaceSize = 63;

  //Color the board
  for(var i=0; i < 8; i++){
    for(var j=0; j < 8; j++){
      if((i % 2) != 0){
        if((j % 2) != 0){
          //Color white
        }
        else{
          //Color black
          chessCtx.fillStyle = colors[0];
          chessCtx.fillRect(i*64, j*64, 64, 64);
        }
      }
      else{
        if((j % 2) != 0){
          //Color black
          chessCtx.fillStyle = colors[0];
          chessCtx.fillRect(i*64, j*64, 64, 64);
        }
        else{
          //Color white
        }
      }
    }
  }

/*make_base();
function make_base()
{
  base_image = new Image();
  base_image.src = 'images/bpawn.png';
  chessCtx.drawImage(base_image, 100, 100);
}*/

}); // end of  document


/*function createPieces(pc){
  var wp1 = {type: "pawn", color: "white", image: "./images/wpawn.png", x: 0, y: 6, hasMoved: false, moveNext: [[0,5], [0,4]]};
  pc.push(wp1);
  var wp2 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 1, y: 6, hasMoved: false, moveNext: [[1,5], [1,4]]};
  pc.push(wp2);
  var wp3 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 2, y: 6, hasMoved: false, moveNext: [[2,5], [2,4]]};
  pc.push(wp3);
  var wp4 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 3, y: 6, hasMoved: false, moveNext: [[3,5], [3,4]]};
  pc.push(wp4);
  var wp5 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 4, y: 6, hasMoved: false, moveNext: [[4,5], [4,4]]};
  pc.push(wp5);
  var wp6 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 5, y: 6, hasMoved: false, moveNext: [[5,5], [5,4]]};
  pc.push(wp6);
  var wp7 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 6, y: 6, hasMoved: false, moveNext: [[6,5], [6,4]]};
  pc.push(wp7);
  var wp8 = {type: "pawn", color: "white", image: "./../images/wpawn.png", x: 7, y: 6, hasMoved: false, moveNext: [[7,5], [7,4]]};
  pc.push(wp8);
  var wr1 = {type: "rook", color: "white", image: "./../images/wrook.png", x: 0, y: 7, hasMoved: false, moveNext: []};
  pc.push(wr1);
  var wr2 = {type: "rook", color: "white", image: "./../images/wrook.png", x: 7, y: 7, hasMoved: false, moveNext: []};
  pc.push(wr2);
  var wkn1 = {type: "knight", color: "white", image: "./../images/wknight.png", x: 1, y: 7, hasMoved: false, moveNext: [[0,5],[2,5]]};
  pc.push(wkn1);
  var wkn2 = {type: "knight", color: "white", image: "./../images/wknight.png", x: 6, y: 7, hasMoved: false, moveNext: [[5,5],[7,5]]};
  pc.push(wkn2);
  var wb1 = {type: "bishop", color: "white", image: "./../images/wbishop.png", x: 2, y: 7, hasMoved: false, moveNext: []};
  pc.push(wb1);
  var wb2 = {type: "bishop", color: "white", image: "./../images/wbishop.png", x: 5, y: 7, hasMoved: false, moveNext: []};
  pc.push(wb2);
  var wq = {type: "queen", color: "white", image: "./../images/wqueen.png", x: 3, y: 7, hasMoved: false, moveNext: []};
  pc.push(wq);
  var wk = {type: "king", color: "white", image: "./../images/wking.png", x: 4, y: 7, hasMoved: false, moveNext: []};
  pc.push(wk);

  var bp1 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 0, y: 1, hasMoved: false, moveNext: [[0,2], [0,3]]};
  pc.push(bp1);
  var bp2 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 1, y: 1, hasMoved: false, moveNext: [[1,2], [1,3]]};
  pc.push(bp2);
  var bp3 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 2, y: 1, hasMoved: false, moveNext: [[2,2], [2,3]]};
  pc.push(bp3);
  var bp4 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 3, y: 1, hasMoved: false, moveNext: [[3,2], [3,3]]};
  pc.push(bp4);
  var bp5 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 4, y: 1, hasMoved: false, moveNext: [[4,2], [4,3]]};
  pc.push(bp5);
  var bp6 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 5, y: 1, hasMoved: false, moveNext: [[5,2], [5,3]]};
  pc.push(bp6);
  var bp7 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 6, y: 1, hasMoved: false, moveNext: [[6,2], [6,3]]};
  pc.push(bp7);
  var bp8 = {type: "pawn", color: "black", image: "./../images/bpawn.png", x: 7, y: 1, hasMoved: false, moveNext: [[7,2], [7,3]]};
  pc.push(bp8);
  var br1 = {type: "rook", color: "black", image: "./../images/brook.png", x: 0, y: 0, hasMoved: false, moveNext: []};
  pc.push(br1);
  var br2 = {type: "rook", color: "black", image: "./../images/brook.png", x: 7, y: 0, hasMoved: false, moveNext: []};
  pc.push(br2);
  var bkn1 = {type: "knight", color: "black", image: "./../images/bknight.png", x: 1, y: 0, hasMoved: false, moveNext: [[0,3],[2,3]]};
  pc.push(bkn1);
  var bkn2 = {type: "knight", color: "black", image: "./../images/bknight.png", x: 6, y: 0, hasMoved: false, moveNext: [[5,3],[7,3]]};
  pc.push(bkn2);
  var bb1 = {type: "bishop", color: "black", image: "./../images/bbishop.png", x: 2, y: 0, hasMoved: false, moveNext: []};
  pc.push(bb1);
  var bb2 = {type: "bishop", color: "black", image: "./../images/bbishop.png", x: 5, y: 0, hasMoved: false, moveNext: []};
  pc.push(bb2);
  var bq = {type: "queen", color: "black", image: "./../images/bqueen.png", x: 3, y: 0, hasMoved: false, moveNext: []};
  pc.push(bq);
  var bk = {type: "king", color: "black", image: "./../images/bking.png", x: 4, y: 0, hasMoved: false, moveNext: []};
  pc.push(bk);

  return pc;
}*/

/**
*/
/*function drawPieces(bt){
  var pieceCanvas = document.getElementById('gamepieces');

  if(pieceCanvas.getContext){
    pieceCtx = pieceCanvas.getContext('2d');



  }


}


*/
/*	findMoves - determines what moves a given piece
*		can take.
*	Currently, the board is represented with board[x,y].
*/
/*function findMoves(piece) {
	moves [];
	x = piece.x;
	y = piece.y;
	switch (piece.type) {	//Each piece moves differently

		case "pawn":
			if (piece.color == "white") {
				//Checks for moving one space
				if (board[x,y-1].checkSpace() == false) { //If space above is empty
					moves.push([x,y-1]);
					if (piece.hasMoved == false) {		//Unmoved pawns can move two spaces
						if (board[x,y-2].checkSpace() == false) {
							moves.push([x,y-2]);
						}
					}
				}
				//Checking if capturing a piece is possible
				if (board[x-1,y-1].checkSpace()) {
					//Look up piece in square [x-1,y-1], if type is "black" add move
				}
				if (board[x+1,y-1].checkSpace()) {
					//Look up piece in square [x+1,y-1], if type is "black" add move
				}

			}


			else {	//black pawn
				//Checks for moving one space
				if (board[x,y+1].checkSpace() == false) { //If space above is empty
					moves.push([x,y+1]);
					if (piece.hasMoved == false) {		//Unmoved pawns can move two spaces
						if (board[x,y+2].checkSpace() == false) {
							moves.push([x,y+2]);
						}
					}
				}
				//Checking if capturing a piece is possible
				if (board[x-1,y+1].checkSpace()) {
					//Look up piece in square [x-1,y+1], if type is "white" add move
				}
				if (board[x+1,y+1].checkSpace()) {
					//Look up piece in square [x+1,y+1], if type is "white" add move
				}
			}
			break;

		case "knight":
			if (piece.color == "white") {
				//8 moves to check
				//If square has a piece of similar color, don't add move
				//Otherwise push to moves

				//[x-2,y+1]
				//[x-1,y+2]

				//[x+2,y+1]
				//[x+1,y+2]

				//[x-2,y-1]
				//[x-1,y-2]

				//[x+2,y-1]
				//[x+1,y-2]
			}

			// "black" knight
			else {
				//8 moves to check
				//If square has a piece of similar color, don't add move
				//Otherwise push to moves

				//[x-2,y+1]
				//[x-1,y+2]

				//[x+2,y+1]
				//[x+1,y+2]

				//[x-2,y-1]
				//[x-1,y-2]

				//[x+2,y-1]
				//[x+1,y-2]
			}
			break;

		case "bishop":
			checkDiagonals(piece);
			break;

		case "rook":
			checkLines(piece);
			break;

		case "queen":
			checkDiagonals(piece);
			checkLines(piece);
			break;

		case "king":
			if (piece.color == "white") {
				//8 moves to check
				//If square has a piece of similar color, don't add move
				//Otherwise push to moves

				//[x-1,y-1]
				//[x,y-1]
				//[x+1,y-1]

				//[x-1,y]
				//[x+1,y]

				//[x-1,y+1]
				//[x,y+1]
				//[x+1,y+1]
			}
			else {
				//8 moves to check
				//If square has a piece of similar color, don't add move
				//Otherwise push to moves

				//[x-1,y-1]
				//[x,y-1]
				//[x+1,y-1]

				//[x-1,y]
				//[x+1,y]

				//[x-1,y+1]
				//[x,y+1]
				//[x+1,y+1]
			}
			break
	}
	piece.moveNext = moves;
}*/

/*	checkDiagonals - checks the four diagonals lines
*		of movement for available spaces.
*		Called by bishops and queens.
*/

/*function checkDiagonals(piece) {
	//Values of x and y that we can modify safely
	currX = x;
	currY = y;
	stop = false; // Exits the loop if the bishop cannot move further
	color = piece.color;
	moves = [];

	//UpLeft checks
	while (stop == false && currX > 0 && currY > 0) {
		if (board[currX-1,currY-1].checkSpace() == false) {
			moves.push([currX-1,currY-1]);
		}
		else {
			//Look up piece in square [currX-1, currY-1],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currX--;
		currY--;
	}
	currX = x;
	currY = y;
	stop = false;

	//UpRight checks
	while (stop == false && currX < 7 && currY > 0) {
		if (board[currX+1,currY-1].checkSpace() == false) {
			moves.push([currX+1,currY-1]);
		}
		else {
			//Look up piece in square [currX+1, currY-1],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currX++;
		currY--;
	}
	currX = x;
	currY = y;
	stop = false;

	//DownLeft checks
	while (stop == false && currX > 0 && currY < 7) {
		if (board[currX-1,currY+1].checkSpace() == false) {
			moves.push([currX-1,currY+1]);
		}
		else {
			//Look up piece in square [currX-1, currY+1],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currX--;
		currY++;
	}
	currX = x;
	currY = y;
	stop = false;

	//DownRight checks
	while (stop == false && currX < 7 && currY < 7) {
		if (board[currX+1,currY+1].checkSpace() == false) {
			moves.push([currX+1,currY+1]);
		}
		else {
			//Look up piece in square [currX+1, currY+1],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currX++;
		currY++;
	}
	piece.moveNext = moves;
}*/

/*	checkLines - checks the four main directional lines
*		of movement for available spaces.
*		Called by rooks and queens.
*/
/*function checkLines(piece) {
	//Values of x and y that we can modify safely
	currX = x;
	currY = y;
	stop = false; // Exits the loop if the bishop cannot move further
	color = piece.color

	//Up checks
	while (stop == false && currY > 0) {
		if (board[x,currY-1].checkSpace() == false) {
			moves.push([x,currY-1]);
		}
		else {
			//Look up piece in square [x-1, currY-1],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currY--;
	}
	currY = y;
	stop = false;

	//Right checks
	while (stop == false && currX < 7) {
		if (board[currX+1,y].checkSpace() == false) {
			moves.push([currX+1,y]);
		}
		else {
			//Look up piece in square [currX+1,y],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currX++;
	}
	currX = x;
	stop = false;

	//Down checks
	while (stop == false && && currY < 7) {
		if (board[x,currY+1].checkSpace() == false) {
			moves.push([x,currY+1]);
		}
		else {
			//Look up piece in square [x, currY+1],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currY++;
	}
	stop = false;

	//Left checks
	while (stop == false && currX > 0) {
		if (board[currX-1,y].checkSpace() == false) {
			moves.push([currX-1,y]);
		}
		else {
			//Look up piece in square [currX-1,y],
			//	if that piece != color, add move, otherwise do not add move.
			stop = true;
		}
		currX--;
	}
	piece.moveNext = moves;
}*/
