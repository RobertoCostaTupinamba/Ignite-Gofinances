import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SigninSocialButton from '../../components/SigninSocialButton';
import { useAuth } from '../../hooks/auth';
import { Container, Header, TitleWrapper, Title, SigninTitle, Footer, FooterWrapper } from './styles';

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      return;
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao fazer login', 'Ocorreu um erro ao fazer login, tente novamente.');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signInWithApple();
      return;
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao fazer login', 'Ocorreu um erro ao fazer login, tente novamente.');
      setIsLoading(false);
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

          {Platform.OS === 'ios' && (
            <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={() => handleSignInWithApple()} />
          )}
        </FooterWrapper>

        {isLoading && <ActivityIndicator size="large" color={theme.colors.shape} style={{ marginTop: 18 }} />}
      </Footer>
    </Container>
  );
}

export default Signin;
