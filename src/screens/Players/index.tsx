import { Button } from "@/components/Button";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Filter } from "@/components/Filter";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";
import { ListEmpty } from "@/components/ListEmpty";
import { PlayerCard } from "@/components/PlayerCard";
import { playerAddByGroup } from "@/storage/player/playerAddByGroup";
import { playersGetByGroup } from "@/storage/player/playersGetByGroup";
import { AppError } from "@/utils/errors/AppError";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

const playersData = [
  "João",
  "Pedro",
  "Maria",
  "Joaquim",
  "Ana",
  "Lucas",
  "Carla",
  "Pedro",
  "Maria",
  "Joaquim",
];

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      const players = await playersGetByGroup(group);
      console.log(players);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova Pessoa", "Não foi possível adicionar.");
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times."
      />

      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon type="PRIMARY" icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há jogadores nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 52 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  );
}
