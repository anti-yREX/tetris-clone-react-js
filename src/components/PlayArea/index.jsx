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
        this.state = {
            pixels: this.getInitialPixels(),
            currentBlock: null,
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
            pixels: this.getUpdatedPixels({
                updateForRotate: true,
                data: {
                    newCurrentBlock,
                    currentBlock,
                },
            }),
            currentBlock: newCurrentBlock,
        });
    }

    currentBlockMoveLeft = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = currentBlockMoveLeft(currentBlock);
        this.setState({
            pixels: this.getUpdatedPixels({
                updateForMove: true,
                data: {
                    newCurrentBlock,
                    currentBlock,
                },
            }),
            currentBlock: newCurrentBlock,
        });
    }

    currentBlockMoveRight = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = currentBlockMoveRight(currentBlock);
        this.setState({
            pixels: this.getUpdatedPixels({
                updateForMove: true,
                data: {
                    newCurrentBlock,
                    currentBlock,
                },
            }),
            currentBlock: newCurrentBlock,
        });
    }

    componentDidMount() {
        // Key capture
        document.body.addEventListener('keypress', this.onBodyKeyPress);

        // Create a Block
        this.createNewCurrentBlock();
    }

    createNewCurrentBlock = () => {
        const currentBlock = this.getInitialBlock('l');
        this.setState({
            pixels: this.getUpdatedPixels({
                addNewBlock: true,
                data: {
                    newCurrentBlock: currentBlock,
                },
            }),
            currentBlock,
        }, () => {
            // Falling Motion
            this.fallingInterval = setInterval(this.currentBlockFalling, 200);
        });
    }

    currentBlockFalling = () => {
        const { currentBlock } = this.state;
        if (currentBlock) {
            const newCurrentBlock = currentBlockFalling(currentBlock);
            const hasBlockReachBottom = this.checkCurrentBlockReachBottom(newCurrentBlock);
            if (!hasBlockReachBottom) {
                this.setState({
                    pixels: this.getUpdatedPixels({
                        updateForFall: true,
                        data: {
                            newCurrentBlock,
                            currentBlock,
                        },
                    }),
                    currentBlock: newCurrentBlock,
                });
            } else {
                this.setState({
                    pixels: this.addBlockToBottom(currentBlock),
                });
            }
        }
    }

    addBlockToBottom = (currentBlock) => {
        const { color, pixels } = currentBlock;
        const newPixels = [];
        console.log(currentBlock);
        return this.state.pixels;
    }

    checkCurrentBlockReachBottom = (newCurrentBlock) => {
        const { pixels } = newCurrentBlock;
        let hasBlockReachBottom = false;
        pixels.forEach(pixel => {
            if (pixel.yCord > 19) {
                clearInterval(this.fallingInterval);
                hasBlockReachBottom = true;
            }
        });
        return hasBlockReachBottom;
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

    getInitialPixels = () => {
        const rowsArray = [];
        for(let i = 0; i < MAX_ROWS ; i+= 1) {
            const colsArray = [];
            for(let j = 0; j < MAX_COLS ; j += 1) {
                colsArray.push({
                    isEmpty: true,
                });
            }
            rowsArray.push(colsArray);
        }
        return rowsArray;
    }

    getUpdatedPixels = (operation) => {
        if (operation.addNewBlock) {
            const { data: { newCurrentBlock } } = operation;
            const { color, pixels: blockPixels } = newCurrentBlock;
            const { pixels } = this.state;
            const newPixels = pixels;
            blockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                newPixels[yCord][xCord] = {
                    isEmpty: false,
                    color,
                }
            });
            return newPixels;
        }
        if (operation.updateForFall || operation.updateForRotate || operation.updateForMove) {
            const {
                data: {
                    currentBlock,
                    newCurrentBlock,
                },
            } = operation;
            const { color, pixels: newBlockPixels } = newCurrentBlock;
            const { pixels: oldBlockPixels } = currentBlock;
            const { pixels } = this.state;
            const newPixels = pixels;
            oldBlockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                newPixels[yCord][xCord] = {
                    isEmpty: true,
                }
            });
            newBlockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                newPixels[yCord][xCord] = {
                    isEmpty: false,
                    color,
                }
            });
            return newPixels;
        }
        if (operation.updateForRotate) {
        }
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
