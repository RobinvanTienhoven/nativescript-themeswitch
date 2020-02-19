import { Component } from '@angular/core';
import { ThemeService } from "../theme/theme.service";
import { Themes } from "../theme/themes";
import { interval } from "rxjs";
import { map } from "rxjs/internal/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Make sure we only select existing themes
  private themes: string[] = Object.keys(Themes);

  constructor(private themeService: ThemeService) { }

  public startTheParty(): void {
    interval(100).pipe(
      // Select random theme key
      map(() => this.themes[Math.floor(Math.random() * this.themes.length)]),
      // Get the corresponding theme name
      map((themeKey: string) => Themes[themeKey]),
      // Change the theme
      map((themeName: Themes) =>  this.themeService.setTheme(themeName)),
    ).subscribe();
  }
}
