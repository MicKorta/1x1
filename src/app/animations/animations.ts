import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { shake, tada, zoomInUp } from 'ngx-animate';

export const slideOut = trigger('slideOut', [
  state('out', style({
    opacity: '0',
    overflow: 'hidden',
    height: '0px',
    width: '200px'
  })),
  transition('in => out', animate('400ms ease-in-out'))
]);

export const smileyInOut = trigger('smileyInOut', [
  state('out', style({ opacity: '0' })),
  transition('out=>in', [
    style({opacity: '0'}),
    animate('1000ms ease-in', style({opacity: '1'}))
  ]),
  transition('in=>out', [
    animate('500ms ease-out', style({transform: 'translateY(-100%)', opacity: 0}))
  ])
]);

export const shakeIt = trigger('shake', [transition('false => true', useAnimation(shake))]);

export const tadaIt = trigger('tada', [transition('false => true', useAnimation(tada))]);

export const zoomIt = trigger('zoom', [transition('false => true', useAnimation(zoomInUp))]);
