import styled from "styled-components";

export const Pixel = styled.div`
    background: ${props => props.isEmpty ? 'transparent' : props.color };
    width: 100%;
`;