import styled from 'styled-components';

export const MenuButton = styled.button`
    position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 50px;
  cursor: pointer;
  z-index: 1000;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;


h2,h3 {
  margin-top: 0;
}

 label {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

button:last-child {
  background-color: #dc3545;
}

button:last-child:hover {
    background-color: #c82333;
}
  
`;
