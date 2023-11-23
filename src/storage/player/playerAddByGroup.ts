import { AppError } from "@/utils/errors/AppError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../storageConfig";
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {

    const storedPlayers = await playersGetByGroup(group);

    const playerAlreadyExists = storedPlayers.some(
      player => player.name === newPlayer.name
    )

    if(playerAlreadyExists) {
      throw new AppError('Essa pessoa já está em um time.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

  } catch (error) {

    throw error;
  }
}