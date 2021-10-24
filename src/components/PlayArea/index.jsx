import React from 'react';
import {
    PlayAreaGrid,
    Pixel,
} from './PlayArea.styles';
import { rotateCurrentBlock } from './PlayAreaLogic';
import { BlockData } from './PlayArea.enum'
const MAX_COLS = 10;
const MAX_ROWS = 20;

class PlayArea extends React.Component {
    constructor(props) {
        super(props);
        const currentBlock = this.getInitialBlock('l');
        console.log(currentBlock);
        this.state = {
            pixels: this.getInitialPixels(currentBlock),
            currentBlock,
        };
    }

    onBodyKeyPress = (event) => {
        console.log(event.key);
        if (event.key === ' ') {
            this.rotateCurrentBlock();
        }
    }

    rotateCurrentBlock = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = rotateCurrentBlock(currentBlock);
        console.log('newCurrent', newCurrentBlock);
        this.setState({
            pixels: this.getInitialPixels(newCurrentBlock),
            currentBlock: newCurrentBlock,
        });
    }

    componentDidMount() {
        document.body.addEventListener('keypress', this.onBodyKeyPress);
    }

    getInitialBlock = (blockName) => {
        switch (blockName) {
            case 'z':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.zData,
                };
            case 's':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.sData,
                };
            case 'l':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.lData,
                };
            case 'j':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.jData,
                };
            case 'o':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.oData,
                };
            case 'i':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.iData,
                };
            case 't':
                return {
                    blockName,
                    state: 0,
                    ...BlockData.tData,
                };
            default:
                return {
                    blockName,
                    state: 0,
                    ...BlockData.zData,
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
                    pixels.find(cur => cur.xCord === j && cur.yCord === i)
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
