import { Component } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  selectedLanguage: string = 'en'; // Set the default language

  constructor(
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  onLanguageChange() {
    this.languageService.setCurrentLanguage(this.selectedLanguage);
    this.cdr.detectChanges();
  }
}
