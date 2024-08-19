import React from 'react';
import dayjs from 'dayjs';
import defaultDealIcon from '../../../assets/deal/Deal.png';
import arrowIcon from '../../../assets/deal/arrow.png';
import {
  DealItem,
  DealTitle,
  IconWrapper,
  StatusBadge,
  GaugeWrapper,
  Gauge,
  PercentageLabel,
  DealDescription,
  ArrowIcon,
  PercentageText,
} from './DealCard.style';

interface Deal {
  deal_id: number;
  deal_name: string;
  deal_desc: string;
  final_amount: number;
  percentage: number;
  start_date: string;
  end_date: string;
  deal_image_url: string;
}

const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => {
  const currentDate = dayjs();
  const endDate = dayjs(deal.end_date);
  const status = currentDate.isBefore(endDate) ? 'ongoing' : 'finished';

  return (
    <DealItem>
      <IconWrapper>
        <img src={deal.deal_image_url || defaultDealIcon} alt="Deal Icon" />
        <StatusBadge status={status}>{status === 'ongoing' ? 'Ongoing' : 'Finished'}</StatusBadge>
      </IconWrapper>

      <PercentageText>{deal.percentage}%</PercentageText>

      <GaugeWrapper>
        <Gauge percentage={deal.percentage} />
        <PercentageLabel>{deal.percentage}%</PercentageLabel>
      </GaugeWrapper>
      <DealTitle>{deal.deal_name}</DealTitle>

      <DealDescription>{deal.deal_desc}</DealDescription>
      <ArrowIcon src={arrowIcon} alt="Arrow Icon" />
    </DealItem>
  );
};

export default DealCard;
