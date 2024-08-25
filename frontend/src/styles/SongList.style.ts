import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const TopMenu = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: #f0f0f0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

export const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SongItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const SongImage = styled.img`
  width: 100%;
  height: 200px;
  max-height: 200px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const Button = styled.button`
  width: 48%;
  margin: 4px;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

export const EditButton = styled(Button)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

export const DeleteButton = styled(Button)`
  background-color: red;

  &:hover {
    background-color: #d43f3a;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #c9302c;
    transform: translateY(0);
  }
`;

export const SongDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  gap: 2px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  margin-top: 10px;
`;

export const LoadingText = styled.h2`
  text-align: center;
`;
