// translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  pure: false, // Ensure the pipe updates when the language changes
})
export class TranslatePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(key: string): string {
    const currentLanguage = this.languageService.getCurrentLanguage();

    const translations = this.languageService.getTranslations(currentLanguage);


    return translations[key] || key;
  }
}
