import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SigninSocialButton from '../../components/SigninSocialButton';
import { Container, Header, TitleWrapper, Title, SigninTitle, Footer, FooterWrapper } from './styles';

function Signin() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            simples e segura
          </Title>
        </TitleWrapper>

        <SigninTitle>
          Faça o seu login com {'\n'}
          uma das contas abaixo
        </SigninTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} />

          <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}

export default Signin;
