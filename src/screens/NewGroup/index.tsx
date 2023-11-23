import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";
import { groupCreate } from "@/storage/group/groupCreate";
import { AppError } from "@/utils/errors/AppError";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import { Header } from "../../components/Header";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [groupName, setGroupName] = useState("");

  const navigation = useNavigation();

  async function handleAddGroup() {
    try {
      if (groupName.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.")
      }
      await groupCreate(groupName);
      navigation.navigate("players", { group: groupName });
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      }else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
        console.log(error);
      }
    }
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
