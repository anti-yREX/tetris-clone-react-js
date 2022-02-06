import React from 'react';
import BlockQueue from '../BlockQueue';
import PlayArea from '../PlayArea';
import {
    PlayAreaWrapper,
    BlockQueueWrapper,
    FlexWrapper,
    MainGameWrapper,
    BlockQueueGradient,
    ScoreWrapper,
    ScoreLabel,
    ScoreValue,
} from './MainGame.styles';
import BlockNameList from './MainGame.enum';
class MainGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
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

    updateScore = (score) => {
        this.setState({ score });
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
        const { score, queue } = this.state;
        return (
            <FlexWrapper>
                <MainGameWrapper>
                    <ScoreWrapper>
                        <div>Score:</div>
                        <div>{score}</div>
                    </ScoreWrapper>
                    <PlayAreaWrapper>
                        <PlayArea
                            queue={queue}
                            queuePop={this.queuePop}
                            updateScore={this.updateScore}
                        />
                    </PlayAreaWrapper>
                    <div
                        style={{
                            position: 'relative',
                        }}
                    >
                        <BlockQueueWrapper>
                            <BlockQueue queue={queue} />
                        </BlockQueueWrapper>
                        <BlockQueueGradient />
                    </div>
                </MainGameWrapper>
            </FlexWrapper>
        );
    }
}

export default MainGame;
