import React from 'react';
import {
    PlayAreaGrid,
    Pixel,
} from './PlayArea.styles';
import {
    rotateCurrentBlock,
    currentBlockMoveLeft,
    currentBlockMoveRight,
    currentBlockFalling,
} from './PlayAreaLogic';
import { BlockData } from './PlayArea.enum'
const MAX_COLS = 10;
const MAX_ROWS = 20;

class PlayArea extends React.Component {
    constructor(props) {
        super(props);
        const currentBlock = this.getInitialBlock('z');
        this.state = {
            pixels: this.getUpdatedPixels(currentBlock),
            currentBlock,
        };
    }

    onBodyKeyPress = (event) => {
        if (event.key === 'w') {
            console.log(event.key);
            this.rotateCurrentBlock();
        }
        if (event.key === 'a') {
            console.log(event.key);
            this.currentBlockMoveLeft();
        }
        if (event.key === 'd') {
            console.log(event.key);
            this.currentBlockMoveRight();
        }
    }

    rotateCurrentBlock = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = rotateCurrentBlock(currentBlock);
        this.setState({
            pixels: this.getUpdatedPixels(newCurrentBlock),
            currentBlock: newCurrentBlock,
        });
    }

    currentBlockMoveLeft = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = currentBlockMoveLeft(currentBlock);
        this.setState({
            pixels: this.getUpdatedPixels(newCurrentBlock),
            currentBlock: newCurrentBlock,
        });
    }

    currentBlockMoveRight = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = currentBlockMoveRight(currentBlock);
        this.setState({
            pixels: this.getUpdatedPixels(newCurrentBlock),
            currentBlock: newCurrentBlock,
        });
    }

    componentDidMount() {
        // Key capture
        document.body.addEventListener('keypress', this.onBodyKeyPress);

        // Falling Motion
        this.fallingInterval = setInterval(this.currentBlockFalling, 1000);
    }

    currentBlockFalling = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = currentBlockFalling(currentBlock);
        const hasBlockReachBottom = this.checkCurrentBlockReachBottom(newCurrentBlock);
        console.log(hasBlockReachBottom, currentBlock, newCurrentBlock);
        if (!hasBlockReachBottom) {
            this.setState({
                pixels: this.getUpdatedPixels(newCurrentBlock),
                currentBlock: newCurrentBlock,
            });
        }
    }

    checkCurrentBlockReachBottom = (newCurrentBlock) => {
        const { pixels } = newCurrentBlock;
        pixels.forEach(pixel => {
            if (pixel.yCord >= 19) {
                clearInterval(this.fallingInterval);
                return true;
            }
        })
        return false;
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

    getUpdatedPixels = (currentBlock) => {
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
