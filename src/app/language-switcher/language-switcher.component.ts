import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  selectedLanguage: string;

  constructor(private languageService: LanguageService) {
    console.log('LanguageSwitcherComponent initialized');
    this.selectedLanguage = languageService.getCurrentLanguage();
  }

  onLanguageChange() {
    console.log('onLanguageChange');
    this.languageService.setCurrentLanguage(this.selectedLanguage);
  }
}
