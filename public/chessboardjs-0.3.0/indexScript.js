var socket = io();

var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
  socket.emit('newBoard', board.fen());
}

var cfg = {
  draggable: true,
  dropOffBoard: 'trash',
  onDrop: onDrop,
  pieceTheme: 'chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png',
  sparePieces: true
}

var board = ChessBoard('board', cfg);
//$('#startBtn').on('click', startGame(board))
//$('#clearBtn').on('click', board.clear);

$('#startBtn').on('click', board.start);
$('#startBtn').on('click', function() {
  console.log("Start the game!");
  socket.emit('start');
});
$( "#clearBtn" ).click(function() {
clearBoard(board);
});

$('#piece-417db').on('click', onDrop);

/*function startGame() {
  console.log("Start the game!");
  socket.emit('start');
}*/

function clearBoard(board) {
  var socket = io();
  board.clear;
  console.log("Clear the board!")
  socket.emit('clear');
}


//PAST THE POINT OF CERTAINTY

$(function(){
// This basically  keep track of the io port and the chat

socket.on('welcome', function(text) {
    $('<li>').text(text).appendTo('#message-log');
});

socket.on('start', board.start);

socket.on('newBoard', function(newPos) {
  console.log("Got the new board");
  board = ChessBoard('board', newPos);
});

socket.on('message', function(message) {
    console.log(message);
    var li = $('<li>')
        .css('color', message.color)
        .appendTo('#message-log');

    $('<strong>')
        .text(message.user + ':')
        .appendTo(li)
        .css('padding-right', '1rem');

    $('<span>')
        .text(message.text)
        .appendTo(li);
});

$('#chat-send').on('click', function() {
  console.log('clicked');
    var text = $('#chat-text').val();
    socket.emit('message', text);
    $('#chat-text').val('');
});

$('#color').on('change', function() {
    var color = $(this).val();
    socket.emit('color', color);
});

}); // document ready
