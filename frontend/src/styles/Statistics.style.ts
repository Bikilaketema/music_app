/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto; /* Center the chart */
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const Section = styled.section`
  margin-bottom: 40px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const SectionTitle = styled.h2`
  margin-bottom: 16px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 12px;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;
