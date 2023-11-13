import styled from 'styled-components';

const CarouselContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 50px;
    padding: 10px;
`
const Icon = styled.img`
    width: 50px;
`

export { CarouselContainer, Icon }