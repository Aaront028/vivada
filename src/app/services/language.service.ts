// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  // Translations will be loaded dynamically from external files
  private translations: Record<string, Record<string, string>> = {};

  constructor(private http: HttpClient) {}

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setCurrentLanguage(language: string) {
    this.loadTranslations(language);
    this.currentLanguageSubject.next(language);
  }

  getTranslations(language: string): Record<string, string> {
    return this.translations[language] || {};
  }

  private loadTranslations(language: string) {
    const translationPath = `assets/i18n/${language}.json`;

    this.http.get<Record<string, string>>(translationPath).subscribe(
      (translations) => {
        this.translations[language] = translations;
      },
      (error) => {
        console.error(`Failed to load translations: ${error}`);
      }
    );
  }
}
