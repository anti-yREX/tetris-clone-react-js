
const MAX_COLS = 9;

const boundaryCorrection = (pixels) => {
    let minXDiff = 0;
    let minYDiff = 0;
    let maxXDiff = 0;
    pixels.forEach(pixel => {
        if (pixel.xCord < 0) {
            const xDiff = 0 - pixel.xCord;
            minXDiff = xDiff > minXDiff ? xDiff: minXDiff;
        }
        if (pixel.xCord >= MAX_COLS) {
            const xDiff = pixel.xCord - MAX_COLS;
            maxXDiff = xDiff > maxXDiff ? xDiff: maxXDiff;
        }
        if (pixel.yCord < 0) {
            const yDiff = 0 - pixel.yCord;
            minYDiff = yDiff > minYDiff ? yDiff: minYDiff;
        }
    });
    const newPixels = pixels.map(pixel => ({
        xCord: pixel.xCord + minXDiff - maxXDiff,
        yCord: pixel.yCord + minYDiff,
    }));
    return newPixels;
}

const rotateZBlock = (currentBlock, state) => {
    if (state === 0) {
        const { pixels } = currentBlock;
        const newPixels = [
            {
                xCord: pixels[0].xCord + 1,
                yCord: pixels[0].yCord - 1,
            },
            {
                xCord: pixels[1].xCord,
                yCord: pixels[1].yCord,
            },
            {
                xCord: pixels[2].xCord - 1,
                yCord: pixels[2].yCord - 1,
            },
            {
                xCord: pixels[3].xCord - 2,
                yCord: pixels[3].yCord,
            },
        ]

        return {
            ...currentBlock,
            pixels: boundaryCorrection(newPixels),
            state: 1,
        }
    }
    if (state === 1) {
        const { pixels } = currentBlock;
        const newPixels = [
            {
                xCord: pixels[0].xCord - 1,
                yCord: pixels[0].yCord + 1,
            },
            {
                xCord: pixels[1].xCord,
                yCord: pixels[1].yCord,
            },
            {
                xCord: pixels[2].xCord + 1,
                yCord: pixels[2].yCord + 1,
            },
            {
                xCord: pixels[3].xCord + 2,
                yCord: pixels[3].yCord,
            },
        ]

        return {
            ...currentBlock,
            pixels: boundaryCorrection(newPixels),
            state: 0,
        }
    }
}

const rotateSBlock = (currentBlock, state) => {
    if (state === 0) {
        const { pixels } = currentBlock;
        const newPixels = [
            {
                xCord: pixels[0].xCord - 1,
                yCord: pixels[0].yCord - 1,
            },
            {
                xCord: pixels[1].xCord,
                yCord: pixels[1].yCord,
            },
            {
                xCord: pixels[2].xCord + 1,
                yCord: pixels[2].yCord - 1,
            },
            {
                xCord: pixels[3].xCord + 2,
                yCord: pixels[3].yCord,
            },
        ]

        return {
            ...currentBlock,
            pixels: boundaryCorrection(newPixels),
            state: 1,
        }
    }
    if (state === 1) {
        const { pixels } = currentBlock;
        const newPixels = [
            {
                xCord: pixels[0].xCord + 1,
                yCord: pixels[0].yCord + 1,
            },
            {
                xCord: pixels[1].xCord,
                yCord: pixels[1].yCord,
            },
            {
                xCord: pixels[2].xCord - 1,
                yCord: pixels[2].yCord + 1,
            },
            {
                xCord: pixels[3].xCord - 2,
                yCord: pixels[3].yCord,
            },
        ]

        return {
            ...currentBlock,
            pixels: boundaryCorrection(newPixels),
            state: 0,
        }
    }
}

const rotateLBlock = (currentBlock, state) => {

}

const rotateJBlock = (currentBlock, state) => {

}

const rotateIBlock = (currentBlock, state) => {
    if (state === 0) {

    }
    if (state === 1) {

    }
}

const rotateTBlock = (currentBlock, state) => {

}

const rotateCurrentBlock = (currentBlock) => {
    const { blockName, state } = currentBlock;
    switch (blockName) {
        case 'z':
            return rotateZBlock(currentBlock, state);
        case 's':
            return rotateSBlock(currentBlock, state);
        case 'l':
            return rotateLBlock(currentBlock, state);
        case 'j':
            return rotateJBlock(currentBlock, state);
        case 'o':
            return currentBlock;
        case 'i':
            return rotateIBlock(currentBlock, state);
        case 't':
            return rotateTBlock(currentBlock, state);
        default:
            return rotateZBlock(currentBlock, state);
    }
}

export {
    rotateCurrentBlock,
};
