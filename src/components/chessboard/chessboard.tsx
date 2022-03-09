import './chessboard.css';
import Tile from "../Tile/tile";
import React, {useRef, useState} from "react";
import Rules from "../../rules/rules"
import {PredictMinMove} from "../predictminMoves";

const horizontalAxis = ["a", "b", "c", "d","e","f","g","h"];
const verticalAxis = ["1", "2", "3", "4","5","6","7","8"];

export const blackMap = new Map([
    ["b0", "0,7"], ["b1", "2,7"], ["b2", "4,7"], ["b3", "6,7"],
    ["b4", "1,6"], ["b5", "3,6"], ["b6", "5,6"], ["b7", "7,6"],
    ["b8", "0,5"], ["b9", "2,5"], ["b10", "4,5"], ["b11", "6,5"],
    ["b12", "1,4"], ["b13", "3,4"], ["b14", "5,4"], ["b15", "7,4"],
    ["b16", "0,3"], ["b17", "2,3"], ["b18", "4,3"], ["b19", "6,3"],
    ["b20", "1,2"], ["b21", "3,2"], ["b22", "5,2"], ["b23", "7,2"],
    ["b24", "0,1"], ["b25", "2,1"], ["b26", "4,1"], ["b27", "6,1"],
    ["b28", "1,0"], ["b29", "3,0"], ["b30", "5,0"], ["b31", "7,0"]
]);
export const whiteMap = new Map([
    ["w0", "1,7"], ["w1", "3,7"], ["w2", "5,7"], ["w3", "7,7"],
    ["w4", "0,6"], ["w5", "2,6"], ["w6", "4,6"], ["w7", "6,6"],
    ["w8", "1,5"], ["w9", "3,5"], ["w10", "5,5"], ["w11", "7,5"],
    ["w12", "0,4"], ["w13", "2,4"], ["w14", "4,4"], ["w15", "6,4"],
    ["w16", "1,3"], ["w17", "3,3"], ["w18", "5,3"], ["w19", "7,3"],
    ["w20", "0,2"], ["w21", "2,2"], ["w22", "4,2"], ["w23", "6,2"],
    ["w24", "1,1"], ["w25", "3,1"], ["w26", "5,1"], ["w27", "7,1"],
    ["w28", "0,0"],
    ["w29", "2,0"], ["w30", "4,0"], ["w31", "6,0"]
]);
let blk : HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("tiles black-tile")!  as HTMLCollectionOf<HTMLElement>
let wht : HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("tiles white-tile")!  as HTMLCollectionOf<HTMLElement>

interface Piece {
    image:String
    x:number
    y:number
    type: pieceType
}
export enum pieceType {
    Knight,
    Target
}

var min = 0;
var max = 7;
function between() {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const initialBoardState: Piece[] = [];
export let a = between()
export let b = between()
let targetC = between()
let targetD = between()

//push knight and target
initialBoardState.push({ image: "../assets/images/knight_b.png", x: a, y: b, type: pieceType.Knight})
initialBoardState.push({ image: "../assets/images/target.png", x: targetC, y: targetD, type: pieceType.Target})

const rules = new Rules()
let xa= 0, ya = 0;
function setXa(x:number) {
    xa = x
}

function getXa() {
    return xa;
}

function setYa(y:number) {
    ya = y
}

function getYa() {
    return ya;
}

let latestX = 0, latestY = 0
export let tileFromKey: string

function keyCheck(a: number, b: number, c: number, d: number): [value:{}, key:string] {
    let val:string, k:string, counter:boolean = false
    if (c === 0 && d === 0) {
        if (a === 0 && b=== 0) {
            val = "0,0"
            k = "w28"
            counter = true
            return [val, k]
        }
        else if ( (a>0 && b>= 0) || (a>=0 && b> 0) ) {

            blackMap.forEach(function (values, keys) {

                if ( values === `${c},${d}`) {
                    val = values
                    k=keys
                    counter = true
                    return [val,k]
                }
            })
            if(!counter) {
                whiteMap.forEach(function (value, key) {

                    if ( value === `${c},${d}`) {
                        val = value
                        k=key
                        counter = false
                        return [val,k]
                    }
                })
            }
        } else {

            blackMap.forEach(function (values, keys) {

                if (  values === `${c},${d}`) {
                    console.log(keys, values, c, d)
                    val = values
                    k=keys
                    counter = true
                    return [val,k]
                }
            })

            if(!counter) {
                whiteMap.forEach(function (value, key) {

                    if (  value === `${c},${d}`) {
                        val = value
                        k=key
                        counter = false
                        return [val,k]
                    }
                })
            }
        }

    }  else {

        blackMap.forEach(function (values, keys) {

            if (  values === `${c},${d}`) {
                val = values
                k=keys
                counter = true
                return [val,k]
            }
        })
        if(!counter) {
            whiteMap.forEach(function (value, key) {
                //console.log(value, key, a, (b), latestX, latestY)
                if (  value === `${c},${d}`) {
                    console.log(key, value, c, d)
                    val = value
                    k=key
                    counter = false
                    return [val,k]
                }
            })
        }
    }
    // @ts-ignore
    return [val, k]
}

export let possiblity: any[] = []
export function predictPossibleMove(key: number) {
    possiblity = []
    if (tileFromKey === "b") {
        if (key === 0) {
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity
        } else if (key === 1 || key === 2) {
            possiblity.push(key + 7)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        } else if (key === 3 ) {
            possiblity.push(key + 7)
            possiblity.push(key + 3)
            possiblity.push(key + 8)
            return possiblity

        } else if (key === 4) {
            possiblity.push(key - 3)
            possiblity.push(key + 9)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        } else if (key === 5 || key === 6) {
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            possiblity.push(key + 9)
            return possiblity
        } else if (key === 7) {
            possiblity.push(key - 5)
            possiblity.push(key + 3)
            possiblity.push(key + 8)
            return possiblity
        }
        else if (key === 8 || key === 16) {
            possiblity.push(key + 5)
            possiblity.push(key - 8)
            // possiblity.push(key + 3)
            possiblity.push(key - 3)
            possiblity.push(key + 8)
            return possiblity
        } else if (key === 24) {
            possiblity.push(key - 8)
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            possiblity.push(key + 9)
            return possiblity
        } else if (key === 9 || key === 10
            ||key === 17 || key === 18) {
            possiblity.push(key - 9)
            possiblity.push(key - 8)
            possiblity.push(key + 7)
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        } else if ( key === 21 || key === 22 ||key === 13 || key === 14) {
            possiblity.push(key + 9)
            possiblity.push(key - 8)
            possiblity.push(key - 7)
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        }

        else if (key === 11 || key === 19 ) {
            possiblity.push(key - 8)
            possiblity.push(key + 3)
            possiblity.push(key - 5)
            possiblity.push(key + 7)
            possiblity.push(key + 8)
            possiblity.push(key - 9)
            return possiblity
        } else if (key === 12 || key === 20 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key - 7)
            possiblity.push(key + 8)
            possiblity.push(key + 9)
            return possiblity
        }  else if (key === 15 || key === 23 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key + 8)
            possiblity.push(key + 3)
            return possiblity
        } else if (key === 25 || key === 26 ) {
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key + 3)
            possiblity.push(key - 9)
            possiblity.push(key - 8)
            return possiblity
        } else if (key === 27 ) {
            possiblity.push(key - 9)
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key + 3)
            return possiblity
        } else if (key === 28 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 7)
            possiblity.push(key - 3)
            return possiblity
        } else if (key === 29 || key === 30 ) {
            possiblity.push(key - 7)
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            return possiblity
        } else {
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            return possiblity
        }
    } else {
        if (key === 0) {
            possiblity.push(key + 9)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity
        } else if (key === 1 || key === 2) {
            possiblity.push(key + 9)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        } else if (key === 3 ) {
            possiblity.push(key + 3)
            possiblity.push(key + 8)
            return possiblity

        } else if (key === 4) {
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        } else if (key === 5 || key === 6) {
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            possiblity.push(key + 7)
            return possiblity
        } else if (key === 7) {
            possiblity.push(key - 5)
            possiblity.push(key + 3)
            possiblity.push(key + 8)
            possiblity.push(key + 7)
            return possiblity
        }
        else if (key === 8 || key === 16) {
            possiblity.push(key + 5)
            possiblity.push(key - 8)
            possiblity.push(key + 9)
            possiblity.push(key - 3)
            possiblity.push(key - 7)
            possiblity.push(key + 8)
            return possiblity
        } else if (key === 24) {
            possiblity.push(key - 8)
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key - 7)
            return possiblity

        } else if (key === 9 || key === 10
            ||key === 17 || key === 18) {
            possiblity.push(key + 9)
            possiblity.push(key - 8)
            possiblity.push(key - 7)
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity

        } else if ( key === 21 || key === 22 ||key === 13 || key === 14) {
            possiblity.push(key - 9)
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            possiblity.push(key + 7)
            return possiblity
        }

        else if (key === 11 || key === 19 ) {
            possiblity.push(key - 8)
            possiblity.push(key + 3)
            possiblity.push(key - 5)
            possiblity.push(key + 8)
            return possiblity
        } else if (key === 12 || key === 20 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key + 8)
            return possiblity
        }  else if (key === 15 || key === 23 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key + 8)
            possiblity.push(key + 3)
            possiblity.push(key + 7)
            possiblity.push(key - 9)
            return possiblity
        } else if (key === 25 || key === 26 ) {
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            possiblity.push(key + 5)
            possiblity.push(key + 3)
            possiblity.push(key - 7)
            possiblity.push(key - 8)
            return possiblity
        } else if (key === 27 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key + 3)
            return possiblity
        } else if (key === 28 ) {
            possiblity.push(key - 8)
            possiblity.push(key - 3)
            return possiblity
        } else if (key === 29 || key === 30 ) {
            possiblity.push(key - 9)
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key - 3)
            return possiblity
        } else {
            possiblity.push(key - 8)
            possiblity.push(key - 5)
            possiblity.push(key - 9)
            return possiblity
        }
    }
}

var clicked = false
export let numFromKey: string[] | null

export function helpMethod(e: React.MouseEvent) {
    // clicked = false
    let checkPos
    if (e && !clicked){
        latestX = a
        latestY = b - 1
    }
    checkPos = keyCheck(a,(b-1), latestX, latestY)
    let val = checkPos[0] //value from map
    let ke = checkPos[1] //key from map

    numFromKey = ke.match(/(\d+)/) //grab number from key string
    tileFromKey = ke.substring(0,1) //grab the alphabet from the key that differentiate the tile

    if (numFromKey != null){
        predictPossibleMove(parseInt(numFromKey[0]))
        console.log(possiblity , "Possiblity")
    }
    try {
        if (tileFromKey === "b") {
            possiblity.forEach(function (k) {
                if (k >= 0 && k <=32 ) {
                    if (wht != null) {
                        // @ts-ignore
                        wht.item(k).style.backgroundColor = "gray"
                    }
                }
            })
        } else {
            possiblity.forEach(function (k) {
                if (k >= 0 && k <=32 ) {
                    if (blk != null) {
                        // @ts-ignore
                        blk.item(k).style.backgroundColor = "gray"
                    }
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
    clicked = true
    let nextMove = PredictMinMove(targetC, (targetD - 1), latestX, latestY)
    console.log(nextMove)

}

export default function Chessboard() {
    let board = [];

    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    const chessboardReference = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [gridX, setGridX] = useState(0)
    const [gridY, setGridY] = useState(0)

    for (let j = verticalAxis.length; j > 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = (j + i + 2)
            let image = undefined;

            pieces.forEach((p) => {
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            });
            board.push(<Tile  image={image} number={number}/>)
        }
    }

    return (<div onMouseMove={e => movePiece(e)}
                 onMouseUp={e => dropPiece(e)}
                 onMouseDown={e => grabPiece(e)}
                 ref={chessboardReference}
                 id="chessboard">{board}</div>);

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardReference.current;
        if (element.classList.contains("chess-piece") && chessboard) {

            let xa = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            let ya = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
            const a = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const b = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
            setGridX(a)
            setGridY(b + 1)

            const x = e.clientX - 50;
            const y = e.clientY - 50;

            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element)
            setXa(xa)
            setYa(ya)
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardReference.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";

            //If x is smaller than minimum amount
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            //If x is bigger than maximum amount
            else if (x > maxX) {
                activePiece.style.left = ` ${maxX}px`;
            }
            //If x is in the constraints
            else {
                activePiece.style.left = `${x}px`;
            }

            //If y is smaller than minimum amount
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            }
            //If y is bigger than maximum amount
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            }
            //If y is in the constraints
            else {
                activePiece.style.top = `${y}px `;
            }
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardReference.current;

        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
            latestX = x
            latestY = y

            //Updates the chess piece position
            setPieces((value) => {
                return value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {

                        const validMove = rules.isValidMove(gridX, gridY, getXa(), getYa(), x, y, p.type)
                        latestX = x
                        latestY = y
                        console.log(validMove)
                        if (validMove) {
                            if (x === targetC && y === (targetD - 1)) {
                                console.log(targetC, targetD)
                                window.alert("You win")
                            }
                            p.x = x;
                            p.y = (y + 1);
                        } else {
                            activePiece.style.position = 'relative'
                            activePiece.style.removeProperty('top')
                            activePiece.style.removeProperty('left')
                        }
                    }
                    return p;
                });
            })
            setActivePiece(null)
        }
        try {
            if (clicked) {
                possiblity.forEach(function (k) {
                    if (k >= 0 && k <= 32) {
                        if (tileFromKey === "b") {
                            // @ts-ignore
                            wht.item(k).style.backgroundColor = "white"
                        } else {
                            // @ts-ignore
                            blk.item(k).style.backgroundColor = "brown"
                        }
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}