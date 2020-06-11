const movable = function(pieceLabel, originPlace, targetPlace) {
  const x = originPlace[0];
  const y = originPlace[1];
  let possibilityPlaces = [];
  let numList = Array.from({ length: 6 }, (v, k) => k + 1);
  if (pieceLabel === "fu") {
    possibilityPlaces = [[x - 1, y]];
  } else if (pieceLabel === "gin") {
    possibilityPlaces = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x + 1, y + 1]
    ];
  } else if (pieceLabel === "gyoku" || pieceLabel === "ou") {
    possibilityPlaces = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1]
    ];
  } else if (pieceLabel === "kin") {
    possibilityPlaces = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y]
    ];
  } else if (pieceLabel === "kaku") {
    possibilityPlaces = possibilityPlaces.concat(
      numList.map(i => [x - i, y - i])
    );
    possibilityPlaces = possibilityPlaces.concat(
      numList.map(i => [x + i, y - i])
    );
    possibilityPlaces = possibilityPlaces.concat(
      numList.map(i => [x - i, y + i])
    );
    possibilityPlaces = possibilityPlaces.concat(
      numList.map(i => [x + i, y + i])
    );
  } else if (pieceLabel === "hisha") {
    possibilityPlaces = possibilityPlaces.concat(numList.map(i => [x, y - i]));
    possibilityPlaces = possibilityPlaces.concat(numList.map(i => [x, y + i]));
    possibilityPlaces = possibilityPlaces.concat(numList.map(i => [x - i, y]));
    possibilityPlaces = possibilityPlaces.concat(numList.map(i => [x + i, y]));
  }
  return possibilityPlaces.some(
    pp => JSON.stringify(pp) === JSON.stringify(targetPlace)
  );
};

const placeable = (piece, targetPlace, board) => {
  const isPiece = (board[targetPlace[0]] || {})[targetPlace[1]];
  return isPiece;
};

export default function(piece, originPlace, targetPlace, board) {
  return (
    movable(piece.label, originPlace, targetPlace) &&
    placeable(piece, targetPlace, board)
  );
}
