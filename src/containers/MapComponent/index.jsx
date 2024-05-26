import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import 'leaflet/dist/leaflet.css';
import PinoCaminhao from '../../assets/pino-caminhao.png';
import PinoCarro from '../../assets/pino-carro.png';
import PinoMoto from '../../assets/pino-moto.png';
import { MenuButton, Modal, ModalContent } from './styles';

const MapComponent = () => {
	const [position, setPosition] = useState(null);
	const [vehicleType, setVehicleType] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const [editCity, setEditCity] = useState('');
	const [editState, setEditState] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const markerRef = useRef(null);

	useEffect(() => {
		const vehicleData = JSON.parse(
			localStorage.getItem('pontotrack:vehicleData'),
		);
		if (vehicleData) {
			setVehicleType(vehicleData.vehicle_type);
			setUserInfo(vehicleData);
			if (navigator.geolocation) {
				const watchId = navigator.geolocation.watchPosition(
					async (pos) => {
						const { latitude, longitude } = pos.coords;
						setPosition([latitude, longitude]);
					},
					() => {
						toast.error(
							'Permissão de localização negada. Não é possível determinar a localização.',
						);
					},
				);

				return () => {
					navigator.geolocation.clearWatch(watchId);
				};
			}
		}
	}, []);

	useEffect(() => {
		if (position && markerRef.current) {
			markerRef.current.openPopup();
		}
	}, [position]);

	const handleUpdateLocation = async () => {
		if (!editCity || !editState) {
			toast.error('Cidade e estado são obrigatórios.');
			return;
		}

		try {
			const response = await api.put(`/locations/${userInfo.id}`, {
				city: editCity,
				state: editState,
			});

			const { latitude, longitude } = response.data;
			setPosition([latitude, longitude]);
			toast.success('Localização atualizada com sucesso.');
			setIsModalOpen(false);
		} catch (error) {
			toast.error('Erro ao atualizar a localização.');
		}
	};

	let iconUrl;
	switch (vehicleType) {
		case 'carro':
			iconUrl = PinoCarro;
			break;
		case 'moto':
			iconUrl = PinoMoto;
			break;
		case 'caminhao':
			iconUrl = PinoCaminhao;
			break;
		default:
			iconUrl = PinoMoto;
	}

	const customIcon = iconUrl
		? new L.Icon({ iconUrl, iconSize: [60, 41], iconAnchor: [30, 41] })
		: null;

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<MenuButton onClick={() => setIsModalOpen(true)}>⋮</MenuButton>

			{position ? (
				<MapContainer
					center={position}
					zoom={14}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={position} icon={customIcon} ref={markerRef}>
						<Popup>Localização atual do veículo</Popup>
					</Marker>
				</MapContainer>
			) : (
				<p>Aguardando a confirmação de localização...</p>
			)}

			{isModalOpen && (
				<Modal>
					<ModalContent>
						<h2>Informações do Veículo</h2>
						<p>Cor: {userInfo.color}</p>
						<p>Ano: {userInfo.year}</p>
						<p>Tipo de Veículo: {userInfo.vehicle_type}</p>
						<p>Modelo: {userInfo.model}</p>
						<p>Placa: {userInfo.plate}</p>

						<h3>Editar Localização</h3>
						<label>
							Cidade:
							<input
								type="text"
								value={editCity}
								onChange={(e) => setEditCity(e.target.value)}
							/>
						</label>
						<label>
							Estado:
							<input
								type="text"
								value={editState}
								onChange={(e) => setEditState(e.target.value)}
							/>
						</label>
						<button onClick={handleUpdateLocation}>
							Atualizar Localização
						</button>
						<button onClick={() => setIsModalOpen(false)}>Fechar</button>
					</ModalContent>
				</Modal>
			)}
		</div>
	);
};

export default MapComponent;
