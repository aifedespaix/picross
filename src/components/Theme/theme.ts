import {ThemeEnum} from '@/components/Theme/theme.enum';
import {ThemeColors} from '@/components/Theme/theme.colors.interface';

export class Theme implements ThemeColors {

  get modal(): string[] {
    return this._modal;
  }

  get actualTheme(): ThemeEnum {
    return this._actualTheme;
  }

  set actualTheme(value: ThemeEnum) {
    this._actualTheme = value;
    this.setColors();
  }

  get close(): string[] {
    return this._close;
  }

  get empty(): string[] {
    return this._empty;
  }

  get hint_valid(): string[] {
    return this._hint_valid;
  }

  get main(): string[] {
    return this._main;
  }

  get second(): string[] {
    return this._second;
  }

  get value(): string[] {
    return this._value;
  }

  get hints(): string[] {
    return this._hints;
  }

  get grid(): string[] {
    return this._grid;
  }

  private readonly themeItem = 'actualTheme';

  private _modal!: string[];

  private _actualTheme: ThemeEnum;

  private _close!: string[];

  private _empty!: string[];

  private _hint_valid!: string[];

  private _main!: string[];

  private _second!: string[];

  private _value!: string[];

  private _hints!: string[];

  private _grid!: string[];

  constructor() {
    this._actualTheme = this.getLocalStorageTheme();
    this.setColors();
  }

  public save() {
    localStorage.setItem(this.themeItem, String(this._actualTheme));
  }

  private setColors() {
    switch (this._actualTheme) {
      case ThemeEnum.DARK:
        this.setColorsDark();
        break;
      case ThemeEnum.LIGHT:
        this.setColorsLight();
        break;
    }
  }

  private setColorsDark() {
    const squareBorder = 'border-green-900';
    this._main = ['bg-black', 'text-white'];
    this._second = ['bg-green-900', 'text-white'];
    this._close = [...this.main, squareBorder];
    this._value = [...this.second, squareBorder];
    this._empty = [...this.main, squareBorder];
    this._hints = ['bg-black', 'text-white'];
    this._hint_valid = ['text-gray-800'];
    this._modal = [...this.main, 'border', 'border-gray-800'];
    this._grid = ['bg-green-900'];
  }

  private setColorsLight() {
    const squareBorder = 'border-blue-700';
    this._main = ['bg-white', 'text-black'];
    this._second = ['bg-blue-700', 'text-white'];
    this._close = [...this.main, squareBorder];
    this._value = [...this.second, squareBorder];
    this._empty = ['bg-white', 'text-gray-400', squareBorder];
    this._hints = ['bg-white', 'text-black'];
    this._hint_valid = ['text-gray-400'];
    this._modal = [...this.main];
    this._grid = ['bg-blue-700'];
  }

  private getLocalStorageTheme() {
    const theme = localStorage.getItem(this.themeItem);
    if (theme) {
      return parseInt(theme, 10) as ThemeEnum;
    } else {
      return ThemeEnum.LIGHT;
    }
  }

}
