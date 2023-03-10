/** @format */

import { SlArrowRight } from 'react-icons/sl';
import { Link, To } from 'react-router-dom';
import styled from 'styled-components';
import fonts from '../../styles/FontStyle';
import colors from '../../styles/Theme';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { catedataState } from '../../state/atoms/DataState';

interface SettingCateListProps {
    children?: React.ReactNode;
    to: To;
    ccSeq?: number;
    cdcSeq?: number;
    fetchData: () => Promise<void>;
}

const SettingCateList = ({
    children,
    to,
    ccSeq,
    cdcSeq,
    fetchData,
}: SettingCateListProps) => {
    console.log('대분류번호', ccSeq);
    console.log('소분류번호', cdcSeq);
    const [cclist, setCclist] = useRecoilState(catedataState);

    const delCate = async () => {
        try {
            const res = await axios.get(
                ccSeq
                    ? `http://haeji.mawani.kro.kr:8585/api/fix/category/delete?no=${ccSeq}`
                    : `http://haeji.mawani.kro.kr:8585/api/fix/category/detail/delete?no=${cdcSeq}`
            );
            if (res) {
                alert(res.data.message);
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateCate = async () => {
        let catename = prompt('수정할 카테고리명을 입력하세요');
        try {
            const res = await axios.post(
                ccSeq
                    ? `http://haeji.mawani.kro.kr:8585/api/fix/category/update?no=${ccSeq}&name=${catename}`
                    : `http://haeji.mawani.kro.kr:8585/api/fix/category/detail/update?no=${cdcSeq}&name=${catename}`
            );
            if (res) {
                alert(res.data.message);
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Minus onClick={() => delCate()}>-</Minus>
            <Catelist>
                <ItemName onClick={() => updateCate()}>{children}</ItemName>
                <Link to={to}>
                    <SlArrowRight size={12} />
                </Link>
            </Catelist>
        </Box>
    );
};

const Box = styled.li`
    display: flex;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0 10px;
    padding: 0px 16px;
`;

const Minus = styled.button`
    width: 15px;
    height: 15px;
    background: #e23636;
    border-radius: 50%;
    border: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Catelist = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.gray200};
    padding: 10px 0px;
`;

const ItemName = styled.span`
    color: ${colors.gray900};
    font: ${fonts.score15Regular};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export default SettingCateList;
