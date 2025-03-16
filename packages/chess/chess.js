// Simple Chess Game Implementation
document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    let board = null;
    let game = new Chess();
    let selectedSquare = null;
    let moveHistory = [];
    
    // DOM elements
    const boardElement = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    const moveHistoryElement = document.getElementById("move-history");
    
    // Initialize the board
    function initBoard() {
        const config = {
            draggable: true,
            position: 'start',
            pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
            onDragStart: onDragStart,
            onDrop: onDrop,
            onSnapEnd: onSnapEnd,
            onMouseoverSquare: onMouseoverSquare,
            onMouseoutSquare: onMouseoutSquare
        };
        
        board = Chessboard('board', config);
        console.log("Chess board initialized");
        
        // Add click handlers for squares
        setTimeout(addClickHandlers, 500);
    }
    
    // Add click handlers to squares
    function addClickHandlers() {
        const squares = document.querySelectorAll('.square-55d63');
        console.log(`Found ${squares.length} squares`);
        
        if (squares.length === 0) {
            setTimeout(addClickHandlers, 500);
            return;
        }
        
        squares.forEach(square => {
            square.addEventListener('click', handleSquareClick);
        });
        
        console.log("Click handlers added");
    }
    
    // Handle square click
    function handleSquareClick(event) {
        let square;
        
        // Determine which square was clicked
        if (event.target.classList.contains('square-55d63')) {
            square = event.target.getAttribute('data-square');
        } else {
            const squareElement = event.target.closest('.square-55d63');
            if (squareElement) {
                square = squareElement.getAttribute('data-square');
            } else {
                return;
            }
        }
        
        console.log(`Clicked on square: ${square}`);
        
        // If no square is selected yet, select this one if it has a piece
        if (!selectedSquare) {
            const piece = game.get(square);
            if (piece) {
                selectedSquare = square;
                highlightSquare(square);
                console.log(`Selected piece at ${square}`);
            }
        } 
        // If a square is already selected, try to move to the new square
        else if (square !== selectedSquare) {
            const move = game.move({
                from: selectedSquare,
                to: square,
                promotion: 'q' // Always promote to queen for simplicity
            });
            
            if (move) {
                console.log(`Moved from ${selectedSquare} to ${square}`);
                board.position(game.fen());
                moveHistory.push(move.san);
                updateMoveHistory();
                checkGameStatus();
            } else {
                console.log(`Invalid move from ${selectedSquare} to ${square}`);
            }
            
            // Reset selection
            removeHighlights();
            selectedSquare = null;
        } 
        // If the same square is clicked again, deselect it
        else {
            removeHighlights();
            selectedSquare = null;
            console.log(`Deselected ${square}`);
        }
    }
    
    // Highlight a square
    function highlightSquare(square) {
        removeHighlights();
        
        const squareElement = document.querySelector(`.square-55d63[data-square="${square}"]`);
        if (squareElement) {
            squareElement.classList.add('highlight-square');
            console.log(`Highlighted square: ${square}`);
        }
    }
    
    // Remove all highlights
    function removeHighlights() {
        const highlightedSquares = document.querySelectorAll('.highlight-square');
        highlightedSquares.forEach(square => {
            square.classList.remove('highlight-square');
        });
    }
    
    // Drag and drop functions
    function onDragStart(source, piece) {
        // Do not pick up pieces if the game is over
        if (game.game_over()) return false;
        
        // Only pick up pieces for the current player
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
        
        console.log(`Dragging from ${source}`);
        return true;
    }
    
    function onDrop(source, target) {
        console.log(`Dropped on ${target}`);
        
        // See if the move is legal
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q' // Always promote to queen for simplicity
        });
        
        // Illegal move
        if (move === null) {
            console.log('Illegal move');
            return 'snapback';
        }
        
        // Legal move
        moveHistory.push(move.san);
        updateMoveHistory();
        checkGameStatus();
    }
    
    function onSnapEnd() {
        board.position(game.fen());
    }
    
    function onMouseoverSquare(square, piece) {
        // Get list of possible moves for this square
        const moves = game.moves({
            square: square,
            verbose: true
        });
        
        // Exit if there are no moves available for this square
        if (moves.length === 0) return;
        
        console.log(`Possible moves from ${square}: ${moves.map(m => m.to).join(', ')}`);
    }
    
    function onMouseoutSquare(square, piece) {
        // Remove highlights
    }
    
    // Update move history display
    function updateMoveHistory() {
        if (moveHistoryElement) {
            moveHistoryElement.textContent = moveHistory.join(', ');
        }
    }
    
    // Check game status
    function checkGameStatus() {
        if (game.in_checkmate()) {
            alert(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`);
        } else if (game.in_draw()) {
            alert('Game ended in draw.');
        } else if (game.in_check()) {
            alert(`${game.turn() === 'w' ? 'White' : 'Black'} is in check.`);
        }
    }
    
    // Reset the game
    function resetGame() {
        game.reset();
        board.position('start');
        moveHistory = [];
        selectedSquare = null;
        removeHighlights();
        updateMoveHistory();
        console.log('Game reset');
    }
    
    // Event listeners
    resetButton.addEventListener('click', resetGame);
    
    // Initialize the board
    initBoard();
});
