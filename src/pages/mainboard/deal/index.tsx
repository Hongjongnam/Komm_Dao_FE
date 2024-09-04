import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DealList from '../../../components/dashboard/deal/DealList';
import { API_BASE_URL } from 'src/utils/utils';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
`;

const Title = styled.h1`
  color: #1a0737;
  font-size: 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
  padding: 20px;
`;

const DealPage: React.FC = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/deals`);
        setDeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleDealClick = (deal: any) => {
    navigate(`/mainboard/deal/${deal.deal_id}`, { state: { deal } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TitleContainer>
        <Title>Deal</Title>
      </TitleContainer>
      <PageContainer>
        <DealList deals={deals} onDealClick={handleDealClick} />
      </PageContainer>
    </>
  );
};

export default DealPage;
