import { pieceType} from "../components/chessboard/chessboard";

export default class Rules {

    isValidMove(px: number, py: number, xa: number, ya: number, x: number, y: number, type: pieceType) {
        console.log(`Previous location: ` +px, (py-1))
        console.log(`Current location: (${x},${y})`)
        console.log(`Piece type: (${type})`)
        console.log(`${xa}, ${ya}`)
        //let validMove = false;
        if (type === pieceType.Knight) {
           //  validMove = knightMove(initialPosition, desiredPosition, team, boardState);
            console.log("Knights")
            if ((x === (xa-1) && y === (ya +2)) || (x === (xa-2) && y === (ya +1))
            || (x === (xa-2) && y === (ya -1)) || (x === (xa-1) && y === (ya -2))
            || (x === (xa+1) && y === (ya -2)) || (x === (xa+2) && y === (ya -1))
            || (x === (xa+2) && y === (ya +1)) || (x === (xa+1) && y === (ya +2)) )
            {
                console.log("Valid move")

                return true
            } else {
                console.log("Invalid move")
                return false
            }
            //return true
        }
        // return false;
    }
}