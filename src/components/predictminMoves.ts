import {numFromKey, possiblity, blackMap, whiteMap} from "./chessboard/chessboard";

export function PredictMinMove(tarX: number, tarY: number, x: number, y: number) {
    let vForValue, pForPossibility: any[]
    pForPossibility = []
    let visited: {} = {}
    visited = ["x,y"]
    if (numFromKey) {
        visited = ""
        possiblity.forEach(function (k) {
            if (k >= 0 && k <= 32) {
                pForPossibility.push(k)
            }
        })
        console.log(pForPossibility, pForPossibility.length);
        for (let i = 0; i <= pForPossibility.length; i++) {
            //check possible path keys with map keys
            blackMap.forEach((values, keys) => {

                let k = keys.match(/(\d+)/)
                // @ts-ignore
                if (k[0] === `${pForPossibility[i]}` ) {
                    whiteMap.forEach((val, keys) => {
                        let k1 = keys.match(/(\d+)/)
                        // @ts-ignore
                        if (k[0] === k1[0]) {
                            values = val
                            console.log(values, val);
                            // @ts-ignore
                            console.log( k[0], `${pForPossibility[i]}`, "Values Here")
                            console.log("Values:", values, "target: ", `${tarX},${tarY}`)
                            switch ((values === `${tarX},${tarY}` )) {
                                case true:
                                    console.log(values, `${tarX},${tarY}`, "Target found")
                                    vForValue = values
                                    break

                                case false:
                                    visited += values
                                    console.log(visited);
                                    // @ts-ignore
                                    console.log("False: ", (visited.length)/3, pForPossibility.length)
                                // PredictMinMove(tarX, tarY, parseInt(values.substring(0,1)), parseInt(values.substring(2,3)))
                            }
                            return values
                        }
                    })
                }
                return values
            })
        }
    }
    return vForValue
}