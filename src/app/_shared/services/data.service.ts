import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConsoleLoggingListener } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.browser/Exports';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject({});
  currentData = this.dataSource.asObservable();

  private MARKETING_SPAM: any =  [
    'free', 'gift', 'now', 'today', 'dollars', '$', 'amount', 'prize', 'off', 'offer', 'reward', 'discount',
     'scheme', 'plan', 'money', 'save', 'savings', 'coverage', 'final', 'last', 'day', 'program', 'new',
     'phone', 'contact', 'mobile', 'click', 'press', 'enter', 'invest', 'returns', 'benefits', 'profit',
      'dream', 'bonus', 'points', 'cashback', 'promotion', 'promo', 'code', 'personal', 'best'
  ];

  private FRAUD_CALL_ALERT: any = [
    'bank', 'card', 'block', 'account', 'aadhaar', 'link', 'digit', 'today', 'now', 'number', 'confirm',
     'message', 'OTP', 'validity', 'expiry', 'date', 'CVV', 'birth', 'PIN', 'transaction', 'ATM', 'Debit',
      'Credit', 'new', 'phone', 'contact', 'mobile', 'press','key', 'enter', 'hacked', 'authorize',
       'unauthorized', 'unusual', 'suspicious', 'alert', 'risk', 'personal', 'data',
       'virus', 'safe', 'remove', 'infect', 'passcode', 'username', 'payment', 'caller', 'caller ID',
        'IVR', 'secure', 'server', 'invalid', 'security', 'red', 'flag', 'someone', 'somebody', 'else',
         'fraud', 'spam', 'error', 'warning', 'wrong'
  ];

  constructor() { }

  validateText(transcript : string) {
    let result = {
      score: 0,
      type: ''
    }
    let marketing_spam_count = this.keyWordsMatcher(transcript, this.MARKETING_SPAM)
    let fraud_alert_count = this.keyWordsMatcher(transcript, this.FRAUD_CALL_ALERT)
    if(marketing_spam_count < 5 && fraud_alert_count < 5 ) {
      let count =  marketing_spam_count > fraud_alert_count ? marketing_spam_count : fraud_alert_count;
      result.score = 100 - (count * 10);
      result.type = 'AUTHENTIC';

    } else if(marketing_spam_count >= 5) {

      result.score = marketing_spam_count >= 10 ? 98 : marketing_spam_count * 10;
      result.type = 'MARKETING SPAM ALERT';

    } else if(fraud_alert_count >= 5) {

      result.score = fraud_alert_count >= 10 ? 98 : fraud_alert_count * 10;
      result.type = 'FRAUD CALL ALERT';
    }
    return result;
  }

  keyWordsMatcher(transcript: string, data) {
    //let count : number = 0;
    let words = [];
    data.forEach(keyword => {
      if(transcript.includes(keyword))  { 
        if(words.length == 0 ) words.push(keyword);
        else if(words.length > 0 && words.indexOf(keyword) == -1)  words.push(keyword);
      }
    });
    console.log('matching words', words);
    return words.length;
  }




  updateData(message: any) {
    this.dataSource.next(message)
  }



}