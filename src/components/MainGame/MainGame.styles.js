import styled from "styled-components";

export const MainGameWrapper = styled.div`
    margin: 32px auto auto auto;
    display: flex;
`;

export const PlayAreaWrapper = styled.div`
    border: 4px solid #FFF;
    border-radius: 8px;
    margin-right: 16px;
`;

export const SideBar = styled.div`
`;

export const BlockQueueWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 4px solid #f1f0f0;
    border-radius: 8px;
    min-width: 88px;
    height: 512px;
    overflow: hidden;
`;

export const FlexWrapper = styled.div`
    display: flex;
`;

export const BlockQueueGradient = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, #1a202c 25%, transparent 100%);
`;

export const ScoreWrapper = styled.div`
    margin-right: 8px;
    text-align: end;
    color: white;
    font-size: 24px;
`;
