import {Injectable} from "@angular/core";
import * as themes from 'nativescript-themes';

export enum Themes {
  YELLOW = 'yellow.css',
  RED = 'red.css',
}

@Injectable({providedIn: 'root'})
export class ThemeService {
  private static THEME_PATH = '~/assets/themes/'; // Path to our theme files

  /**
   * Sets a new application theme
   * @param theme - The theme that should be set
   */
  public setTheme(theme: Themes): void {
    themes.applyTheme(ThemeService.THEME_PATH + theme);
  }
}
