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
import { 
    BlockNameList,
    BlockData,
} from './PlayArea.enum'
const MAX_COLS = 10;
const MAX_ROWS = 20;
const cloneDeepPixels = (oldPixelsArray) => {
    const newPixels = [];
    oldPixelsArray.forEach(row => {
        const newRow = [];
        row.forEach(pixel => {
            newRow.push(Object.assign({}, pixel))
        });
        newPixels.push(newRow);
    });
    return newPixels;
}
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
        if (event.key === 's') {
            console.log(event.key);
            this.addBlockDirectlyToBottom();
        }
        if (event.key === 'x') {
            console.log(event.key);
            this.stopGame();
        }
    }

    rotateCurrentBlock = () => {
        const { currentBlock } = this.state;
        const newCurrentBlock = rotateCurrentBlock(currentBlock);
        const hasCollidedWithBottomBlocks = this.checkCurrentBlockReachBottomBlocks(newCurrentBlock);
        if (hasCollidedWithBottomBlocks) {
            return;
        }
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
        const hasCollidedWithBottomBlocks = this.checkCurrentBlockReachBottomBlocks(newCurrentBlock);
        if (hasCollidedWithBottomBlocks) {
            return;
        }
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
        const hasCollidedWithBottomBlocks = this.checkCurrentBlockReachBottomBlocks(newCurrentBlock);
        if (hasCollidedWithBottomBlocks) {
            return;
        }
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

    stopGame = () => {
        this.setState({
            currentBlock: null,
        }, () => {
            clearInterval(this.fallingInterval);
        })
    };

    componentDidMount() {
        // Key capture
        document.body.addEventListener('keypress', this.onBodyKeyPress);

        // Create a Block
        this.createNewCurrentBlock();
    }

    createNewCurrentBlock = () => {
        const blockName = this.props.queuePop();
        const currentBlock = this.getInitialBlock(blockName);
        const hasCollidedWithBottomBlocks = this.checkCurrentBlockReachBottomBlocks(currentBlock);
        if (hasCollidedWithBottomBlocks) {
            const lastBlock = this.getLastBlock(currentBlock);
            if (lastBlock) {
                this.setState({
                    pixels: this.getUpdatedPixels({
                        addLastBlock: true,
                        data: {
                            lastBlock,
                        },
                    }),
                    currentBlock: null,
                }, () => {
                    clearInterval(this.fallingInterval);
                });
            } else {
                clearInterval(this.fallingInterval);
            }
            return;
        }
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
            this.fallingInterval = setInterval(this.currentBlockFalling, 850);
        });
    }

    getLastBlock = (currentBlock) => {
        const { pixels } = this.state;
        let yDistance = 0;
        for (let row in pixels) {
            let isNotEmpty = false;
            for (let pixel in pixels[row]) {
                if (pixels[row][pixel].isEmpty === false) {
                    isNotEmpty = true;
                    break;
                }
            }
            if (isNotEmpty) {
                break;
            }
            yDistance += 1;
        }
        if (yDistance === 0) {
            return null;
        }
        return {
            ...currentBlock,
            pixels: currentBlock.pixels.map(cur => ({
                ...cur,
                yCord: cur.yCord - (currentBlock.maxHeight - yDistance),
            })),
        }
    }

    currentBlockFalling = () => {
        const { currentBlock } = this.state;
        if (currentBlock) {
            const newCurrentBlock = currentBlockFalling(currentBlock);
            const hasReachBottomBlocks = this.checkCurrentBlockReachBottomBlocks(newCurrentBlock);
            if (hasReachBottomBlocks) {
                this.setState({
                    pixels: this.getUpdatedPixels({
                        addBlockToBottom: true,
                        data: {
                            currentBlock,
                        },
                    }),
                }, () => {
                    clearInterval(this.fallingInterval);
                    // Create a Block
                    this.createNewCurrentBlock();
                });
                return;
            }
            const hasReachBottom = this.checkCurrentBlockReachBottom(newCurrentBlock);
            if (hasReachBottom) {
                this.setState({
                    pixels: this.getUpdatedPixels({
                        addBlockToBottom: true,
                        data: {
                            currentBlock,
                        },
                    }),
                }, () => {
                    clearInterval(this.fallingInterval);
                    // Create a Block
                    this.createNewCurrentBlock();
                });
            } else {
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
            }
        }
    }

    addBlockDirectlyToBottom = () => {
        clearInterval(this.fallingInterval);
        const { currentBlock, pixels } = this.state;
        const { pixels: currentBlockPixels } = currentBlock;
        let minY = 19;
        currentBlockPixels.forEach(pixel => {
            const { xCord, yCord } = pixel;
            let bottomPixelY = null;
            for (let i = yCord; i <= 19 - yCord; i+= 1) {
                if (pixels[yCord + i][xCord].isEmpty === false && pixels[yCord + i][xCord].isBottom === true) {
                    bottomPixelY = i;
                    break;
                }
            }
            bottomPixelY = bottomPixelY === null ? (19 - yCord) : bottomPixelY - 1;
            minY = minY < bottomPixelY ? minY : bottomPixelY;
        })
        const newCurrentBlock = {
            ...currentBlock,
            pixels: currentBlockPixels.map(cur => ({
                ...cur,
                yCord: cur.yCord + minY,
            }))
        };

        this.setState({
            currentBlock: newCurrentBlock,
            pixels: this.getUpdatedPixels({
                addBlockDirectlyToBottom: true,
                data: {
                    newCurrentBlock,
                    currentBlock,
                },
            }),
        }, () => {
            // Create a Block
            this.createNewCurrentBlock();
        })
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

    checkCurrentBlockReachBottomBlocks = (newCurrentBlock) => {
        const { pixels } = newCurrentBlock;
        const { pixels: screenPixels } = this.state;
        let hasReachBottomBlocks = false;
        pixels.forEach(pixel => {
            const { xCord, yCord } = pixel;
            if (screenPixels[yCord]) {
                const currentPixel = screenPixels[yCord][xCord];
                if (currentPixel?.isEmpty === false && currentPixel?.isBottom === true) {
                    hasReachBottomBlocks = true;
                }
            }
        });
        return hasReachBottomBlocks;
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
        if (
            operation.updateForFall ||
            operation.updateForRotate ||
            operation.updateForMove ||
            operation.addBlockDirectlyToBottom
        ) {
            const {
                data: {
                    currentBlock,
                    newCurrentBlock,
                },
            } = operation;
            const { color, pixels: newBlockPixels } = newCurrentBlock;
            const { pixels: oldBlockPixels } = currentBlock;
            const { pixels } = this.state;
            const newPixels = cloneDeepPixels(pixels);
            oldBlockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                newPixels[yCord][xCord] = {
                    isEmpty: true,
                }
            });
            newBlockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                if (newPixels && newPixels[yCord] && newPixels[yCord][xCord]) {
                    newPixels[yCord][xCord] = {
                        isEmpty: false,
                        color,
                        isBottom: operation.addBlockDirectlyToBottom,
                    }
                }
            });
            return newPixels;
        }
        if (operation.addBlockToBottom) {
            const {
                data: {
                    currentBlock,
                },
            } = operation;
            const { color, pixels: blockPixels } = currentBlock;
            const { pixels } = this.state;
            const newPixels = pixels;
            blockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                newPixels[yCord][xCord] = {
                    isEmpty: false,
                    color,
                    isBottom: true,
                }
            });
            return newPixels;
        }
        if (operation.addLastBlock) {
            const {
                data: {
                    lastBlock,
                },
            } = operation;
            const { color, pixels: blockPixels } = lastBlock;
            const { pixels } = this.state;
            const newPixels = cloneDeepPixels(pixels);
            blockPixels.forEach(pixel => {
                const { xCord, yCord } = pixel;
                if (yCord >= 0 && xCord >= 0) {
                    newPixels[yCord][xCord] = {
                        isEmpty: false,
                        color,
                        isBottom: true,
                    }
                }
            });
            return newPixels;
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
