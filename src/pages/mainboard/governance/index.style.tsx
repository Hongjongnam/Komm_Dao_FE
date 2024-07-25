import styled from "styled-components";

export const GovernanceContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white10};
  position: relative; /* For absolute positioning of ConnectWallet */
`;

export const GovernanceTitle = styled.h1`
  color: #1a0737;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px; /* Adjust margin as needed */
`;

export const GovernanceContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
`;

export const ConnectWalletWrapper = styled.div`
  position: absolute; /* Positioning to place it at the top right */
  top: 20px; /* Adjust top position */
  right: 20px; /* Adjust right position */
`;

export const MainSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 57px 0 0 0;
`
export const SubSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const NavBar = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
`
export const NavList = styled.li<{ active: boolean }>`
    cursor: pointer;
    list-style-type: none;
    text-decoration: none;
    color: #875CFF;
    font-size: 20px;
    font-style: normal;
    font-weight: ${({ active }) => active ? '700' : '400'};
    line-height: normal;
`