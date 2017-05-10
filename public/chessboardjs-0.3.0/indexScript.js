var board1 = ChessBoard('board1', {
draggable: true,
dropOffBoard: 'trash',
pieceTheme: 'chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png',
sparePieces: true
});
$('#startBtn').on('click', board1.start);
$('#clearBtn').on('click', board1.clear);
