import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-ponto-track.png';
import LogoTelefone from '../../assets/logo-telefone.png';
import TelefoneDois from '../../assets/telefonedois.png';
import { Butao, Button, Container } from './styles';

export function Header() {
	const navigate = useNavigate();

	return (
		<Container>
			<img src={Logo} alt="logo-ponto-track" className="logo" />

			<div className="secondcontainer">
				<img src={LogoTelefone} alt="logo-telefone" className="telefone" />
				<div className="localizacao">
					<h3>(43) 3017-0227</h3>
					<h4>Londrina e Região</h4>
				</div>
			</div>

			<div className="terceirocontainer">
				<img src={TelefoneDois} alt="Whatapp" className="telefonedois" />
				<div>
					<h3>0800-400-0227</h3>
					<h4>Demais Regiões</h4>
				</div>
			</div>

			<Button onClick={() => navigate('/register')}>CRIAR CONTA</Button>
			<Butao onClick={() => navigate('/login')}>LOGIN</Butao>
		</Container>
	);
}
