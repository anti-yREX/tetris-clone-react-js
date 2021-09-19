import React from 'react';
import {
    PlayAreaGrid,
    Pixel,
} from './PlayArea.styles';

const MAX_COLS = 10;
const MAX_ROWS = 20;

class PlayArea extends React.Component {
    constructor(props) {
        super(props);
        const currentBlock = this.getInitialBlock('s');
        this.state = {
            pixels: this.getInitialPixels(currentBlock),
        };
    }

    getInitialBlock = (blockString) => {
        switch (blockString) {
            case 's':
                return {
                    color: 'red',
                    pixels: [
                        {
                            xCoord: 3,
                            yCoord: 0,
                        },
                        {
                            xCoord: 4,
                            yCoord: 0,
                        },
                        {
                            xCoord: 4,
                            yCoord: 1,
                        },
                        {
                            xCoord: 5,
                            yCoord: 1,
                        },
                    ],
                };
            case 'z':
                return {
                    color: 'red',
                    pixels: [
                        {
                            xCoord: 5,
                            yCoord: 0,
                        },
                        {
                            xCoord: 6,
                            yCoord: 0,
                        },
                        {
                            xCoord: 4,
                            yCoord: 1,
                        },
                        {
                            xCoord: 5,
                            yCoord: 1,
                        },
                    ],
                };
            case 'l':
                return {
                    color: 'red',
                    pixels: [],
                };
            case 'j':
                return {
                    color: 'red',
                    pixels: [],
                };
            case 'o':
                return {
                    color: 'red',
                    pixels: [],
                };
            case 'i':
                return {
                    color: 'red',
                    pixels: [],
                };
            case 't':
                return {
                    color: 'red',
                    pixels: [],
                };
            default:
                return {
                    color: 'red',
                    pixels: [],
                };
        }
    }

    getInitialPixels = (currentBlock) => {
        const { color, pixels } = currentBlock;
        const rowsArray = [];
        for(let i = 0; i < MAX_ROWS ; i+= 1) {
            const colsArray = [];
            for(let j = 0; j < MAX_COLS ; j += 1) {
                if (
                    pixels.find(cur => cur.xCoord === j && cur.yCoord === i)
                ) {
                    colsArray.push({
                        color,
                        isEmpty: false,
                    });
                } else {
                    colsArray.push({
                        isEmpty: true,
                    });
                }
            }
            rowsArray.push(colsArray);
        }
        return rowsArray;
    }

    render() {
        const { pixels } = this.state;
        console.log(pixels);
        return (
            <PlayAreaGrid>
                {pixels.map(row => (
                    row.map(pixel => (
                        <Pixel
                            color={pixel.color}
                            isEmpty={pixel.isEmpty}
                        />
                    ))
                ))}
            </PlayAreaGrid>
        );
    }
}

export default PlayArea;
