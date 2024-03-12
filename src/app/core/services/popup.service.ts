import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { PopupComponent } from '../../shared/components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  showAsElement(message:string) {
    const popupElement:NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as NgElement & WithProperties<PopupComponent>;

    setTimeout(() => {

      document.body.removeChild(popupElement);
    }, 3000);

    popupElement.message = message;
    document.body.appendChild(popupElement);
  }
}
