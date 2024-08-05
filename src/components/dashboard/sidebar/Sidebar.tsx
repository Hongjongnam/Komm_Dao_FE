// src/pages/dashboard/Sidebar.tsx
import React from 'react';
import { PATH } from '../../../constants/path';
import { SidebarContainer, Logo, NavItem, Icon, Name, NotificationItem } from '../../dashboard/sidebar/Sidebar.style';
import { images } from '../../../assets/dashboard/images';

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo style={{ backgroundImage: `url(${images.sidebarLogo})` }} />
      <NavItem to={PATH.DASHBOARD}>
        <Icon imageUrl={images.dashboardIcon} />
        <Name>Dashboard</Name>
      </NavItem>
      <NavItem to={PATH.DEAL}>
        <Icon imageUrl={images.dealIcon} />
        <Name>Deal</Name>
      </NavItem>
      <NavItem to={PATH.DISCOVER}>
        <Icon imageUrl={images.discoverIcon} />
        <Name>Discover</Name>
      </NavItem>
      <NavItem to={PATH.CONTRIBUTION}>
        <Icon imageUrl={images.contributionIcon} />
        <Name>Contribution</Name>
      </NavItem>
      <NavItem to={PATH.GOVERNANCE}>
        <Icon imageUrl={images.governanceIcon} />
        <Name>Governance</Name>
      </NavItem>
      <NotificationItem>
        <Icon imageUrl={images.notificationsIcon} />
      </NotificationItem>
    </SidebarContainer>
  );
};

export default Sidebar;
