import Vue from 'vue';
import Vuex from 'vuex';
import {AppSounds} from '@/app.sounds.interface';
import {SquareState} from '@/components/Picross/Square/SquareState';
import {Theme} from '@/components/Theme/theme';
import {ThemeEnum} from '@/components/Theme/theme.enum';
import {GameConfig} from '@/components/Picross/GameConfig';

Vue.use(Vuex);

/**
 * todo type this file
 */
export default new Vuex.Store({
  state: {

    theme: new Theme(),
    gameConfig: new GameConfig(),
    gameState: SquareState.Value,

    sounds: {
      isActivated: true,
      close: new Audio(require('@/assets/audio/close.mp3')),
      empty: new Audio(require('@/assets/audio/empty.mp3')),
      undo: new Audio(require('@/assets/audio/undo.mp3')),
      undo_2: new Audio(require('@/assets/audio/undo_2.mp3')),
      value: new Audio(require('@/assets/audio/value.mp3')),
      win: new Audio(require('@/assets/audio/win.mp3')),
    } as AppSounds,

  },
  mutations: {
    CHANGE_THEME(state, theme: ThemeEnum) {
      state.theme.actualTheme = theme;
    },
    CONFIG_RIGHT_CLICK_CHANGE(state, value: boolean) {
      state.gameConfig.rightClickChange = value;
    },
    CHANGE_GAME_STATE(state, value: SquareState) {
      state.gameState = value;
    },
  },
  getters: {
    theme: (state) => state.theme,
    sounds: (state) => state.sounds,
    gameConfig: (state) => state.gameConfig,
    gameState: (state) => state.gameState,
  },
  actions: {
    playSound({getters}, sound: HTMLAudioElement) {
      if (getters.sounds.isActivated) {
        sound.currentTime = 0;
        sound.play();
      }
    },
    playWinSound({getters, dispatch}) {
      dispatch('playSound', getters.sounds.win);
    },
    playStateSound({getters, dispatch}, squareState: SquareState) {
      dispatch('playSound', getters.sounds[squareState]);
    },
    changeTheme(context, theme: ThemeEnum) {
      context.commit('CHANGE_THEME', theme);
    },
    configRightClickChange(context, value: boolean) {
      context.commit('CONFIG_RIGHT_CLICK_CHANGE', value);
    },
    changeGameState(context, value: SquareState) {
      context.commit('CHANGE_GAME_STATE', value);
    },
  },
  strict: true,
});
