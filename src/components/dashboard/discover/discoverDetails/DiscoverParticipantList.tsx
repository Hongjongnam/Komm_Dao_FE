import React, { useState } from 'react';
import Web3 from 'web3';
import {
  ParticipantListContainer,
  LeftSection,
  RightSection,
  ParticipantItem,
  RatingSection,
  RatingContainer,
  ClaimXPButton,
  BtnWrap,
  LoadingOverlay,
  LoadingSpinner,
} from './DiscoverParticipantList.style';
import { images } from 'src/assets/discover/images';
import ClaimModal from './ClaimModal';
import checkedStar from 'src/assets/discover/checkedStar.svg';
import axios from 'axios';
import { API_BASE_URL } from 'src/utils/utils';
import { XpClaim_ABI } from 'src/configs/contract-abi/XpClaim';

// 환경 변수에서 어드민 계정 정보를 가져옵니다.
const adminAddress = process.env.REACT_APP_ADMIN_WALLET_ADDRESS || '';
const adminPrivateKey = process.env.REACT_APP_ADMIN_WALLET_PRIVATE_KEY || '';

console.log(adminAddress, adminPrivateKey);

interface ParticipantListProps {
  participants: { id: number; user: string }[];
}
const DiscoverParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [points, setPoints] = useState<number>(4);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const contractAddress = '0x15e7a34b6a5aBf8b0aD4FcD85D873FD7e7163E97';
  const contractABI = XpClaim_ABI;

  // XP 잔액을 가져와서 백엔드에 업데이트하는 함수
  const updateXPBalance = async (walletAddress: string, xpBalance: number) => {
    try {
      await axios.post(`${API_BASE_URL}/api/user/profile/update-xp-balance`, {
        walletAddress,
        xpBalance,
      });

      console.log(`XP balance updated in database for ${walletAddress}.`);
    } catch (error) {
      console.error('Error updating XP balance:', error);
      alert('XP 잔액 업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // 포인트 히스토리 업데이트 함수
  const updatePointHistory = async (walletAddress: string, xpPoints: number, transactionHash: string) => {
    try {
      await axios.post(`${API_BASE_URL}/api/user/profile/update-history`, {
        walletAddress,
        date: new Date().toISOString(),
        participation: 'Project Rating',
        activity: 'Claim XP',
        xpEarned: xpPoints,
        transactionId: transactionHash,
      });

      console.log(`Point history updated for wallet ${walletAddress}`);
    } catch (error) {
      console.error('Error updating point history:', error);
    }
  };

  // XP 클레임 처리 함수
  const handleClaimXPClick = async () => {
    if (isLoading) return; // 중복 방지

    setPoints(rating);
    setIsLoading(true);

    try {
      const web3 = new Web3((window as any).ethereum);
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
      const xpPoints = 10;

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // 가스 가격 및 가스 추정
      const gasPrice = await web3.eth.getGasPrice();

      const gasEstimate = await contract.methods.claimXP(walletAddress, xpPoints).estimateGas({ from: adminAddress });
      console.log('Estimated gas:', gasEstimate);

      // const nonce = await web3.eth.getTransactionCount(adminAddress, 'pending');

      const tx = {
        from: adminAddress,
        to: contractAddress,
        data: contract.methods.claimXP(walletAddress, xpPoints).encodeABI(),
        gas: gasEstimate.toString(),
        gasPrice: gasPrice.toString(),
        value: '0x0',
        // nonce: nonce, // 수동으로 설정한 논스
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, adminPrivateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');
      if (!receipt.transactionHash) {
        throw new Error('Transaction failed');
      }

      const transactionHash = receipt.transactionHash.toString();

      // 트랜잭션 성공 후, 새로운 API로 XP 잔액 업데이트
      const xpBalanceRaw = await contract.methods.getXP(walletAddress).call();

      if (!xpBalanceRaw) {
        throw new Error('Invalid XP balance returned from contract');
      }

      const xpBalance = parseInt(xpBalanceRaw.toString(), 10);
      if (isNaN(xpBalance)) {
        throw new Error('Failed to parse XP balance');
      }

      await updateXPBalance(walletAddress, xpBalance);

      await updatePointHistory(walletAddress, xpPoints, transactionHash);

      setIsModalOpen(true);
    } catch (error) {
      console.error('XP 클레임 중 오류 발생:', error);
      alert('XP 클레임 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner></LoadingSpinner>
        </LoadingOverlay>
      )}
      <ParticipantListContainer style={{ filter: isLoading ? 'blur(4px)' : 'none' }}>
        <LeftSection>
          <h3>Participant List</h3>
          <div>
            {participants.map((participant) => (
              <ParticipantItem key={participant.id}>
                <img src={participant.user} alt={`Participant ${participant.id}`} />
              </ParticipantItem>
            ))}
          </div>
        </LeftSection>
        <RightSection>
          <RatingSection>
            <p>Please rate using one of the 5 scores</p>
            <RatingContainer>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    src={(hoverRating ? index < hoverRating : index < rating) ? checkedStar : images.star2}
                    alt="Rating Star"
                    key={index}
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => handleStarHover(index)}
                    onMouseLeave={handleStarLeave}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              <div
                style={{
                  marginLeft: '20px',
                  marginTop: '15px',
                  fontWeight: 'bold',
                  fontSize: '30px',
                  color: '#210d5c',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {displayRating}
              </div>
            </RatingContainer>
            <BtnWrap>
              <p>
                Each rating earns you <span>10 XP!</span>
              </p>
              <ClaimXPButton onClick={handleClaimXPClick}>Claim XP</ClaimXPButton>
            </BtnWrap>
          </RatingSection>
        </RightSection>
        <ClaimModal isOpen={isModalOpen} onClose={closeModal} points={points} />
      </ParticipantListContainer>
    </>
  );
};

export default DiscoverParticipantList;
