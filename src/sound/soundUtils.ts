import SoundManager, { SoundManagerEvent } from './SoundManager';
import { SET_IS_PLAYING } from '../store/module/app/app';

interface IStore {
  commit: (mutation: string, payload: any) => void;
}

export function setupStoreInteraction(soundManager: SoundManager, store: IStore): void {
  soundManager.addEventListener(SoundManagerEvent.START, () => {
    store.commit(SET_IS_PLAYING, true);
  });

  soundManager.addEventListener(SoundManagerEvent.STOP, () => {
    store.commit(SET_IS_PLAYING, false);
  });
}
