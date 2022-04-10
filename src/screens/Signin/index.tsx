import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SigninSocialButton from '../../components/SigninSocialButton';
import { useAuth } from '../../hooks/auth';
import { Container, Header, TitleWrapper, Title, SigninTitle, Footer, FooterWrapper } from './styles';

function Signin() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);

      Alert.alert('Erro ao fazer login', 'Ocorreu um erro ao fazer login, tente novamente.');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);

      Alert.alert('Erro ao fazer login', 'Ocorreu um erro ao fazer login, tente novamente.');
    }
  }

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
          <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={() => handleSignInWithGoogle()} />

          <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={() => handleSignInWithApple()} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}

export default Signin;
