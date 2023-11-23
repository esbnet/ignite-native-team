import { AppError } from '@/utils/errors/AppError';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '../storageConfig';
import { groupsGetAll } from './groupGetAll';

export async function groupCreate(newGroup: string) {
  try {
    {
      const storedGroups = await groupsGetAll();

      const groupAlreadyExists = storedGroups.includes(newGroup);

      if(groupAlreadyExists) {
        throw new AppError('Ja existe uma turma com esse nome, escolha outro. ');
      }
      
      const storage = JSON.stringify([...storedGroups, newGroup]); 

      await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    }
  } catch (error) {
    throw error;
  }
}