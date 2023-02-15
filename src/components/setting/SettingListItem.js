import { SlArrowRight } from 'react-icons/sl';
import styled from 'styled-components';
import fonts from '../../styles/FontStyle';
import colors from '../../styles/Theme';

const SettingListItem = ({ children }) => {
  return (
    <Box>
      <ItemName>{children}</ItemName>
      <SelectIcon>
        <SlArrowRight size={12} />
      </SelectIcon>
    </Box>
  );
};

const Box = styled.li`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 58px;
  border-bottom: 1px solid ${colors.gray200};
  cursor: pointer;
`;
const ItemName = styled.span`
  color: ${colors.gray900};
  font: ${fonts.score15Regular};
`;

const SelectIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  color: ${colors.placeholder};
`;
export default SettingListItem;