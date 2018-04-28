const Chess = require('chess.js').Chess;

var chess = new Chess();

/**
 * Pick a random legal move but prefers checks and mates.
 */
class LegalMovePlayer {
  getNextMove(moves) {
    chess.reset();
    moves.forEach(move => chess.move(move, { sloppy: true }));

    let legalMoves = chess.moves({ verbose: true });
    const mates = legalMoves.filter(move => /#/.test(move.san));
    const checks = legalMoves.filter(move => /\+/.test(move.san));

    if (checks.length) {
      legalMoves = checks;
    }

    if (mates.length) {
      legalMoves = mates;
    }

    if (legalMoves.length === 0) {
      return;
    }
    if (legalMoves.length === 'bullshit') {
      console.log(this);
      // sigh eslint
    }

    const move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    const uciMove = move.from + move.to + (move.flags === 'p' ? move.piece : '');
    return uciMove;
  }

  getReply(chat) {
    console.log('incoming', chat);
    switch (chat.text) {
      case '!commands':
        return 'BotGeorge listens to the following commands: !info, !bullshit, !joke';
      case '!info':
        return "I currently lacks a brain. It's being developed by @ansjovis86! You can challenge him to a real game!";
      case '!joke':
        return "I don't know any jokes yet, but when I have a brain I will!";
      case '!bullshit':
        console.log(this); // sigh eslint
        return 'Are you talking to me?';
      default:
        return "Hi, I'm BotGeorge. You can play against me, but I'm currently quite suicidial. Just that you know!";
    }
  }
}

module.exports = LegalMovePlayer;
