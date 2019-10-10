import Vue from 'vue';
import Vuex from 'vuex';
import {AppColors} from '@/app.colors.interface';
import {AppSounds} from '@/app.sounds.interface';
import {SquareState} from '@/components/Picross/Square/SquareState';

Vue.use(Vuex);

/**
 * todo type this file
 */
export default new Vuex.Store({
  state: {

    colors: {
      main_bg: 'bg-blue-900',
      main_text: 'text-white',
      second_bg: 'bg-white',
      second_text: 'text-black',
    } as AppColors,

    sounds: {
      isActivated: true,
      close: new Audio(require('@/assets/audio/close.mp3')),
      empty: new Audio(require('@/assets/audio/empty.mp3')),
      undo: new Audio(require('@/assets/audio/undo.mp3')),
      undo_2: new Audio(require('@/assets/audio/undo_2.mp3')),
      value: new Audio(require('@/assets/audio/value.mp3')),
    } as AppSounds,

  },
  mutations: {
    MAIN_BG(state, bgClass: string) {
      state.colors.main_bg = bgClass;
    },
    MAIN_TEXT(state, textClass: string) {
      state.colors.main_text = textClass;
    },
    SECOND_BG(state, bgClass: string) {
      state.colors.second_bg = bgClass;
    },
    SECOND_TEXT(state, textClass: string) {
      state.colors.second_text = textClass;
    },
  },
  getters: {
    colors: (state) => state.colors,
    sounds: (state) => state.sounds,
  },
  actions: {
    mainBg(context, bgClass: string) {
      context.commit('MAIN_BG', bgClass);
    },
    mainText(context, textClass: string) {
      context.commit('MAIN_TEXT', textClass);
    },
    playSound({getters}, sound: HTMLAudioElement) {
      if (getters.sounds.isActivated) {
        sound.currentTime = 0;
        sound.play();
      }
    },
    playStateSound({state, getters, dispatch}, squareState: SquareState) {
      dispatch('playSound', getters.sounds[squareState]);
    },
  },
  strict: true,
});
