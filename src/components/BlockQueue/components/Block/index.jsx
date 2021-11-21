import React from 'react';
import {
    Pixel,
} from './Block.styles';

class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getPixels = () => {
        const {
            maxHeight,
            maxWidth,
            pixels: pixelsProps,
            color,
        } = this.props;
        const pixels = [];
        for (let i = 0; i < maxHeight; i += 1) {
            const row = []
            for (let j = 0; j < maxWidth; j += 1) {
                const isNotEmpty = pixelsProps.find(cur => (cur[0] === j && cur[1] === i));
                console.log(j, i, pixelsProps);

                if (isNotEmpty) {
                    row.push({
                        isEmpty: false,
                        color,
                    });
                } else {
                    row.push({
                        isEmpty: true,
                    });
                }
            }
            pixels.push(row);
        }
        return pixels;
    }

    render() {
        const pixels = this.getPixels();
        return (
            <React.Fragment>
                {pixels.map(row => (
                    row.map(pixel => (
                        <Pixel
                            {...pixel}
                        />
                    ))
                ))}
            </React.Fragment>
        );
    }
}

export default Block;
