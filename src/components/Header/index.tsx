import { Container, Logo } from "./styles"

export function Header( ){
  return (
    <Container>
      <Logo source={require('@/assets/logo.png')} />
    </Container>
  )
}