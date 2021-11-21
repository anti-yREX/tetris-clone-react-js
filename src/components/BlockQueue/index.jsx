import React from 'react';
import Block from './components/Block';
import {
    BlockContainer,
} from './BlockQueue.styles';
import BlockData from './BlockQueue.enum';

class BlockQueue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queue: [
                this.getBlockData('z'),
                this.getBlockData('s'),
                this.getBlockData('l'),
                this.getBlockData('j'),
                this.getBlockData('o'),
                this.getBlockData('t'),
                this.getBlockData('i'),
            ],
        };
    }

    getBlockData = (blockName) => {
        return BlockData[blockName];
    }

    render() {
        const { queue } = this.state;
        return (
            <React.Fragment>
                    {queue.map((current) => (
                        <BlockContainer
                            widthCount={current.maxWidth}
                            heightCount={current.maxHeight}
                        >
                            <Block
                                {...current}
                            />
                        </BlockContainer>
                    ))}
            </React.Fragment>
        );
    }
}

export default BlockQueue;
