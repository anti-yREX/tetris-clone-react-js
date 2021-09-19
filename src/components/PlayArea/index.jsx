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
        this.state = {
            pixels: this.getInitialPixels(),
        };
    }

    getInitialPixels = () => {
        const rowsArray = [];
        for(let i = 0; i < MAX_ROWS ; i+= 1) {
            const colsArray = [];
            for(let j = 1; j < MAX_COLS ; j += 1) {
                if (j === 3) {
                    colsArray.push({
                        isEmpty: false,
                    });
                }
                colsArray.push({
                    isEmpty: true,
                });
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
                            isEmpty={pixel.isEmpty}
                        />
                    ))
                ))}
            </PlayAreaGrid>
        );
    }
}

export default PlayArea;
