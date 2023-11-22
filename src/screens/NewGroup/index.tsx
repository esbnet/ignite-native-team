import { Button } from "@/components/Button";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [groups, setGroups] = useState([]);

  return (
    <Container>
      <Header showBackButton={true} />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie uma turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" />
        <Button title="Criar" style={{ marginTop: 20 }}/>
      </Content>
    </Container>
  );
}
