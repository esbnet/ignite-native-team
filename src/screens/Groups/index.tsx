import { StyleSheet, Text } from 'react-native';

import { Container } from './styles';

export default function Groups() {
  return (
    <Container>
      <Text style={styles.text}>
        Groups
        </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 32
  }
});
