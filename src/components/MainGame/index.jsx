import React from 'react';
import BlockQueue from '../BlockQueue';
import PlayArea from '../PlayArea';
import {
    PlayAreaWrapper,
    BlockQueueWrapper,
    FlexWrapper,
    MainGameWrapper,
} from './MainGame.styles';
import BlockNameList from './MainGame.enum';
class MainGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: this.getInitialQueue(),
        };
    }

    getInitialQueue = () => {
        const queue = [];
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * 10) % 6;
            queue.push(BlockNameList[randomIndex]);
        }
        return queue;
    }

    queuePop = () => {
        const { queue } = this.state;
        const newQueue = [...queue];

        const firstBlock = newQueue.shift();
        const randomIndex = Math.floor(Math.random() * 10) % 6;
        newQueue.push(BlockNameList[randomIndex]);

        this.setState({
            queue: newQueue,
        });

        return firstBlock;
    }

    render() {
        const { queue } = this.state;
        return (
            <FlexWrapper>
                <MainGameWrapper>
                    <PlayAreaWrapper>
                        <PlayArea
                            queue={queue}
                            queuePop={this.queuePop}
                        />
                    </PlayAreaWrapper>
                    <div>
                        <BlockQueueWrapper>
                            <BlockQueue queue={queue} />
                        </BlockQueueWrapper>
                    </div>
                </MainGameWrapper>
            </FlexWrapper>
        );
    }
}

export default MainGame;
