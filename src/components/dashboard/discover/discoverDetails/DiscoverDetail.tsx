import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ShareModal from './ShareModal';
import ConfirmationModal from './ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import {
  DiscoverDetailContainer,
  ProjectHeader,
  ProjectNameWrapper,
  ProjectName,
  ShareIcon,
  SocialIcons,
  Description,
  AddWatchlistLink,
} from './DiscoverDetail.style';
import { images } from 'src/assets/discover/images';
import { API_BASE_URL } from 'src/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

const DiscoverDetail = () => {
  const location = useLocation();
  const projectData = location.state || {}; // 기본값을 빈 객체로 설정
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/watchlist/${user.user_id}`);
        const userWatchlist = response.data.data.map((item: any) => item.pjt_id);
        setIsInWatchlist(userWatchlist.includes(projectData.pjt_id));
      } catch (error) {
        console.error('Error checking watchlist status:', error);
      }
    };

    if (user && projectData.pjt_id) {
      checkWatchlistStatus();
    }
  }, [user, projectData.pjt_id]);

  const handleWatchlistClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default link behavior

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      if (isInWatchlist) {
        await axios.delete(`${API_BASE_URL}/api/user/watchlist/remove`, {
          data: { user_id: user.user_id, pjt_id: projectData.pjt_id },
        });
        toast.success('Successfully removed from watchlist!'); // Success message
      } else {
        await axios.post(`${API_BASE_URL}/api/user/watchlist/add`, {
          user_id: user.user_id,
          pjt_id: projectData.pjt_id,
        });
        toast.success('Successfully added to watchlist!'); // Success message
      }

      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  };

  const handleCopyLink = () => {
    if (isShareModalOpen) {
      setIsShareModalOpen(false);
    }
    console.log('Link copied to clipboard!');
    setIsConfirmationModalOpen(true);
    setTimeout(() => {
      setIsConfirmationModalOpen(false);
    }, 3000);
  };

  if (!projectData.pjt_name) {
    return <div>Loading...</div>; // 데이터가 없을 때 로딩 상태 표시
  }

  return (
    <DiscoverDetailContainer>
      <ProjectHeader>
        <ProjectNameWrapper>
          <ProjectName>{projectData.pjt_name}</ProjectName>
          <ShareIcon src={images.share} alt="Share" onClick={() => setIsShareModalOpen(true)} />
        </ProjectNameWrapper>
        {!isInWatchlist && (
          <AddWatchlistLink href="#" onClick={handleWatchlistClick}>
            + Add Watchlist
          </AddWatchlistLink>
        )}
      </ProjectHeader>
      <SocialIcons>
        <img src={images.language} alt="Language" />
        <img src={images.twitter} alt="Twitter" />
        <img src={images.discord} alt="Discord" />
      </SocialIcons>
      <Description>{projectData.pjt_summary || 'No description available'}</Description>
      {isShareModalOpen && (
        <ShareModal
          link={window.location.href}
          onClose={() => setIsShareModalOpen(false)}
          onCopyLink={handleCopyLink}
        />
      )}
      {isConfirmationModalOpen && <ConfirmationModal />}
      <ToastContainer /> {/* Add ToastContainer component */}
    </DiscoverDetailContainer>
  );
};

export default DiscoverDetail;