/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 16px auto;
  padding: 16px;
  background-color: #007bff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 12px;
    margin: 8px auto;
    width: 90%;
  }
`;

export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  background-color: #007bff;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  @media (max-width: 600px) {
    padding: 6px;
    font-size: 14px;
  }
`;

export const Label = styled.label`
  color: white;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #004494;
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;
