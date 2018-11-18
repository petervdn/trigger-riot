import SoundManager, { SoundManagerEvent } from './SoundManager';
import { SET_IS_PLAYING } from '../store/module/app/app';
import { IStore } from '../data/interface';

export function setupStoreInteraction(soundManager: SoundManager, store: IStore): void {
  soundManager.addEventListener(SoundManagerEvent.START, () => {
    store.commit(SET_IS_PLAYING, true);
  });

  soundManager.addEventListener(SoundManagerEvent.STOP, () => {
    store.commit(SET_IS_PLAYING, false);
  });

  soundManager.setStore(store);
}
