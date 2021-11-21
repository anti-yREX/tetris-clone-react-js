import styled from "styled-components";

export const Pixel = styled.div`
    background: ${props => props.isEmpty ? '#26d6dea8' : props.color };
    width: 100%;
`;

export const BlockContainer = styled.div`
    margin: 4px auto 4px auto;
    display: grid;
    grid-row-gap: 2px;
    grid-column-gap: 2px;
    grid-template-columns: repeat(${props => props.widthCount }, 24px);
    grid-template-rows: repeat(${props => props.heightCount }, 24px);
`;

export const DummyDiv = styled.div`
    background: #FFF;
`;
