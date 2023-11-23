import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Content, Icon } from "./styles";


export function NewGroup() {
  const [groupName, setGroupName] = useState("");

  const navigation = useNavigation();

  function handleAddGroup() {
    navigation.navigate("players", { group: groupName })
  }

  return (
    <Container>
      <Header showBackButton={true} />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie uma turma para adicionar as pessoas"
        />

        <Input 
        placeholder="Nome da turma" 
        onChangeText={setGroupName}
        value={groupName}
        />
        <Button 
        title="Criar" 
        style={{ marginTop: 20 }}
        onPress={handleAddGroup}
        />
      </Content>
    </Container>
  );
}
