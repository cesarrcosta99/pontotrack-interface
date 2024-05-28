import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    align-items:center;
    position: absolute;
    top:0;
    width:100vw;
    height:105px;
    z-index:1;
    padding-left: 95px;

    .logo{
        width:160px;
    }

    .secondcontainer{
        display: flex;
    margin-left: 251px;
    margin-right: 104px;

    .localizacao{
        margin-top:16px;
        margin-left: -6px;

        h3{
            font-size: 17px;
            font-weight: 700;
            color:#ECA504;
            margin-bottom:5px;
        }
        h4{
            color: #FFFFFF;
            font-size: 13px;
            font-weight: 400;
        }
    }

        .telefone{
            filter: invert(1) brightness(3);
            width: 75px;
        }
    }

    .terceirocontainer{
        display:flex;
        margin-right:100px;
        .telefonedois{
            width: 41px;
            filter:invert(1);
            margin-right: 12px;
        }

        h3{
            font-size: 17px;
            font-weight: 700;
            color:#ECA504;
            margin-bottom:5px;
        }
        h4{
            color: #FFFFFF;
            font-size: 13px;
            font-weight: 400;
        }

        
    }

    @media (max-width: 500px) {
        align-items: flex-start;
        padding-left: 12px;
        padding-top: 16px;

        .logo {
            width: 140px;
            margin-bottom: 20px;
        }

        .secondcontainer, .terceirocontainer {
            flex-direction: column;
            margin-left: 0;
            margin-right: 0;
            align-items: flex-start;

            .localizacao, .telefonedois {
                margin: 0;
            }

            h3, h4 {
                font-size: 14px;
            }
        }

        .secondcontainer {
            margin-bottom: 20px;
        }

        .terceirocontainer {
            margin-bottom: 20px;
        }
    }
`;

export const Button = styled.button`
    background-color: #137533;
    color: #fff;
    border: none;
    width: 140px;
    padding: 8px;
    border-radius: 20px;
    margin-right:15px;

    &:hover {
        opacity:0.6;
    }

    @media (max-width: 430px) {
        width: 120px;
        padding: 6px;
        margin-bottom: 10px;
    }
`;

export const Butao = styled.button`
    background-color:#fff;
    border: 2px solid #137533;
    color:#137533;
    width: 81px;
    padding: 10px;
    border-radius: 15px;

    &:hover {
       opacity:0.6;
    }

    @media (max-width: 430px) {
        width: 70px;
        padding: 8px;
    }
`;
