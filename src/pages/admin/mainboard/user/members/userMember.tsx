import React, { useEffect, useState, useCallback } from 'react';
import {
  UserMemberContainer,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  CheckboxHeader,
  Checkbox,
  Popup,
  CheckboxContainer,
  Checkmark,
} from './userMember.style';
import axios from 'axios';
import headerbox from 'src/assets/admin/headerbox.svg';
import checkbox from 'src/assets/admin/cellbox.svg';
import TopBar from 'src/components/admin/topbar/Topbar';
import checkmark from 'src/assets/admin/cell_check.svg';

interface Member {
  user_id: number;
  user_name: string;
  email_addr: string;
  wallet_addr: string;
  expertise: string;
  bio: string;
  //   kommitte_role: string;
  kommittees: {
    komm_name: string;
  };
  cur_xp: number;
  grade: string;
  last_login: string;
  appr_date: string;
  appr_status: string;
}

const UserMember: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // 검색
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 체크박스
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const handleMouseEnter = useCallback((content: string, e: React.MouseEvent<HTMLTableCellElement>) => {
    if (content === '~~') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupContent(content);
    setPopupPosition({
      top: rect.top + window.scrollY + 40, // Adjust as needed
      left: rect.left + window.scrollX + rect.width / 2,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPopupContent(null);
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/member-list');

        const data = response.data;
        console.log(data);
        if (data.length < 20) {
          const emptyItems = Array.from({ length: 20 - data.length }, (_, index) => ({
            user_id: `empty-${index}`,
            user_name: '~~',
            email_addr: '~~',
            wallet_addr: '~~',
            expertise: '~~',
            bio: '~~',
            kommittees: {
              komm_name: '~~',
            },
            value_add: '~~',
            reg_date: '~~',
            appr_status: '~~',
            appr_date: '~~',
          }));
          setMembers([...data, ...emptyItems]);
        } else {
          setMembers(data);
        }
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchMembers();
  }, [members]);

  useEffect(() => {
    const filteredData = members.filter((members) =>
      Object.values(members).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredMembers(filteredData);
  }, [searchTerm, members]);

  // Approve 기능
  const handleRevoke = async (user_id: number, status: string) => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/update-status', { user_id, status });
      if (response.status === 200) {
        setMembers((prevMembers) =>
          prevMembers.map((member) => (member.user_id === user_id ? { ...member, appr_status: status } : member))
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // 체크박스 기능
  const handleCheckboxChange = (user_id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(user_id)) {
        newSelectedRows.delete(user_id);
      } else {
        newSelectedRows.add(user_id);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedRows(new Set());
    } else {
      const allIds = new Set(members.filter((member) => member.user_name !== '~~').map((member) => member.user_id));
      setSelectedRows(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <UserMemberContainer>
      <Title>User Mgmt {'>'} Members</Title>
      <TopBar onSearchChange={setSearchTerm} />
      <Table>
        <thead>
          <TableRow>
            <TableHeader>
              <CheckboxContainer onClick={handleSelectAllChange}>
                <Checkbox src={headerbox} alt="checkbox" />
                {isAllSelected && <Checkmark src={checkmark} alt="checkmark" />}
              </CheckboxContainer>
            </TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Wallet</TableHeader>
            <TableHeader>Expertise</TableHeader>
            <TableHeader>Bio</TableHeader>
            <TableHeader>Kommittee Role</TableHeader>
            <TableHeader>XP</TableHeader>
            <TableHeader>Grade</TableHeader>
            <TableHeader>Approval Date</TableHeader>
            <TableHeader>Last Login Date</TableHeader>
            <TableHeader>Revoke</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <TableRow key={member.user_id} $isSelected={selectedRows.has(member.user_id)}>
              <TableCell
                $isSelected={selectedRows.has(member.user_id)}
                onClick={() => handleCheckboxChange(member.user_id)}
              >
                {member.user_name !== '~~' && (
                  <CheckboxContainer>
                    <Checkbox src={checkbox} alt="checkbox" />
                    {selectedRows.has(member.user_id) && <Checkmark src={checkmark} alt="checkmark" />}
                  </CheckboxContainer>
                )}
              </TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>{member.user_name}</TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>{member.email_addr}</TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>{member.wallet_addr}</TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>{member.expertise}</TableCell>
              <TableCell
                $isSelected={selectedRows.has(member.user_id)}
                onMouseEnter={(e) => handleMouseEnter(member.bio, e)}
                onMouseLeave={handleMouseLeave}
              >
                {member.bio}
              </TableCell>
              <TableCell
                $isSelected={selectedRows.has(member.user_id)}
                onMouseEnter={(e) => handleMouseEnter(member.kommittees.komm_name, e)}
                onMouseLeave={handleMouseLeave}
              >
                {member.kommittees.komm_name == null ? '~~' : member.kommittees.komm_name}
              </TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>{member.cur_xp}</TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>
                {member.grade == null ? `~~` : member.grade}
              </TableCell>
              <TableCell
                $isSelected={selectedRows.has(member.user_id)}
                onMouseEnter={(e) => handleMouseEnter(member.appr_date, e)}
                onMouseLeave={handleMouseLeave}
              >
                {member.appr_date == null ? '~~' : member.appr_date}
              </TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>
                {member.last_login == null ? `~~` : member.last_login}
              </TableCell>
              <TableCell $isSelected={selectedRows.has(member.user_id)}>
                {member.appr_status === 'APPLIED' ? (
                  <>
                    <button onClick={() => handleRevoke(member.user_id, 'REVOKE')}>Revoke</button>
                  </>
                ) : (
                  member.appr_status
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {popupContent && <Popup style={{ top: popupPosition.top, left: popupPosition.left }}>{popupContent}</Popup>}
    </UserMemberContainer>
  );
};

export default UserMember;
