import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import LogoImage from '../asset/images/cloud.png';
const Auth = () => {
  const { VITE_KAKAO_API, VITE_REDITECT_URI } = import.meta.env;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_API}&redirect_uri=${VITE_REDITECT_URI}&response_type=code`;
  return (
    <Page>
      <Logo>
        <img src={LogoImage} alt='로고' style={{ width: 320, height: 320 }} />
      </Logo>
      <ButtonArea>
        <Link to={KAKAO_AUTH_URL}>
          <Button variant={'kakao'}>카카오로 가입하기</Button>
        </Link>
        <Link to='/register'>
          <Button variant={'primary'}>이메일로 가입하기</Button>
        </Link>
        <Link to='/login'>
          <Button variant={'transparent'}>로그인하기</Button>
        </Link>
      </ButtonArea>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 100px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 16px;
`;

export default Auth;
