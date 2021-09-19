import styled from "styled-components";

export const PlayAreaGrid = styled.div`
    display: grid;
    grid-row-gap: 2px;
    grid-column-gap: 2px;
    grid-template-columns: repeat(10, 24px);
    grid-template-rows: repeat(20, 24px);
`;

export const Pixel = styled.div`
    background: #26d6dea8;
    width: 100%;
    height: 100;
`;

export const FlexWrapper = styled.div`
    display: flex;
`;