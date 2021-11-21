import React from 'react';
import BlockQueue from '../BlockQueue';
import PlayArea from '../PlayArea';
import {
    PlayAreaWrapper,
    BlockQueueWrapper,
    FlexWrapper,
    MainGameWrapper,
} from './MainGame.styles';

class MainGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <FlexWrapper>
                <MainGameWrapper>
                    <PlayAreaWrapper>
                        <PlayArea />
                    </PlayAreaWrapper>
                    <div>
                        <BlockQueueWrapper>
                            <BlockQueue />
                        </BlockQueueWrapper>
                    </div>
                </MainGameWrapper>
            </FlexWrapper>
        );
    }
}

export default MainGame;
