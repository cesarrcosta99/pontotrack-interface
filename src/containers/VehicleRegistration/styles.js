import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	background-color: #221F23;
	padding-top: 74px;

	h1 {
		color: #fff;
		font-style: italic;
		font-weight: 500;
		font-size: 22px;
		margin-bottom: 40px;
	}

	input {
		height: 38px;
		width: 322px;
		padding: 10px 16px;
		font-size: 18px;
		line-height: 1.3333333;
		margin-bottom: -7px;
		border: none;
	}

	input.error {
		border: 2px solid #CC1717;
	}
`;

export const Imagem = styled.img`
	width: 227px;
	margin-bottom: 20px;
`;

export const SecondContainer = styled.div`
	min-height: 20px;
	padding: 24px;
	margin-bottom: 20px;
	background-color: #f5f5f5;
	border: 1px solid #e3e3e3;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;

	p {
		font-size: 14px;
		line-height: 80%;
		color: #cf3057;
		font-weight: 600;
		height: 10px;
	}

	p.tel {
		margin-top: -20px;
	}

	input.endereco {
		margin-top: 3px;
	}

	input.coe {
		margin-top: -22px;
	}

	input.error {
		border: 2px solid #CC1717;
	}
`;

export const ButtonRegister = styled.button`
	background-color: #137533;
    color:#E6E6E6;
	border: 1px solid gray;
	width: 100%;
	padding: 10px 16px;
	font-size: 18px;
	line-height: 1.3333333;

	&:hover {
		opacity: 0.9;
	}
`;
