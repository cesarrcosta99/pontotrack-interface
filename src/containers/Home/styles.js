import styled from 'styled-components';
import Banner from '../../assets/super-banner.png';

export const Container = styled.div`
    background-image:url(${Banner});
    background-size:cover;
    background-position:center;
    height:100vh;
    width: 100vw; 

    @media (max-width: 500px) {
        height: 932px;
    }
`;
