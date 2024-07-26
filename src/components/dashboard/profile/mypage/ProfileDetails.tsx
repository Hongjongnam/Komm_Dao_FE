import React from 'react';
import {
  Container,
  ProfileContainer,
  ProfileImage,
  Info,
  Name,
  Job,
  Email,
  WalletAddressWrap,
  WalletAddressContentsWrap,
  WalletAddress,
  WalletContents,
  CopyButton,
  CopyIcon,
  BioWrap,
  Bio,
  BioContents,
  MembershipNftWrap,
  MembershipNftWrapInner,
  MembershipNftTitle,
  OpenSeaIcon,
  OpenSeaLink,
  EditButton,
  EditIcon,
  CardContainerWrapper,
} from './ProfileDetails.style';
import JoinCard from './JoinCard';
import { PATH } from 'src/constants/path';
import { useNavigate } from 'react-router-dom';

const editIconPath = '/assets/images/edit_icon.png';
const profile_images = '/assets/images/profile_default.png';
const copyIconPath = '/assets/images/copy_icon.png';
const openSeaIconPath = '/assets/images/openSea.png';

const ProfileDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(PATH.PROFILE_UPDATE);
  };

  const handleCopy = () => {
    const textToCopy = 'Connected WalletAddress';
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage src={profile_images} alt="Profile" />
        <Info>
          <Name>Stella</Name>
          <Job>Marketer</Job>
          <Email>stella@google.com</Email>
        </Info>
      </ProfileContainer>
      <WalletAddressWrap>
        <WalletAddress>Wallet Address</WalletAddress>
        <WalletAddressContentsWrap>
          <WalletContents>0x1234...abcd</WalletContents>
          <CopyButton onClick={handleCopy}>
            <CopyIcon src={copyIconPath} alt="Copy Icon" />
          </CopyButton>
        </WalletAddressContentsWrap>
      </WalletAddressWrap>
      <BioWrap>
        <Bio>Bio</Bio>
        <BioContents>A short bio about John Doe.</BioContents>
      </BioWrap>
      <MembershipNftWrap>
        <MembershipNftTitle>Membership NFT</MembershipNftTitle>
        <MembershipNftWrapInner>
          <OpenSeaIcon src={openSeaIconPath} alt="OpenSea Icon" />
          <OpenSeaLink href="https://opensea.io/assets/nft" target="_blank" rel="noopener noreferrer">
            View on OpenSea
          </OpenSeaLink>
        </MembershipNftWrapInner>
      </MembershipNftWrap>
      <EditButton onClick={handleEditClick}>
        <EditIcon src={editIconPath} alt="Edit Icon" />
        Edit
      </EditButton>
      <CardContainerWrapper>
        <JoinCard title="Card 1" content="Content for card 1" />
        <JoinCard title="Card 2" content="Content for card 2" />
      </CardContainerWrapper>
    </Container>
  );
};

export default ProfileDetails;
