import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DataService } from '../_shared/services/data.service';
import { environment } from 'src/environments/environment';

import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { BehaviorSubject } from 'rxjs';

let speechSubject$ = new BehaviorSubject('');

@Component({
  selector: 'app-upload-audio',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.css']
})
export class UploadAudioComponent implements OnInit {

  srcResult: any;
  audioSrc: any;

  @Output() scoreEvent = new EventEmitter<any>();
  @Output() transcriptEvent = new EventEmitter<string>();
  @Output() activeSecEvent = new EventEmitter<any>();

  //microsofot speech service == > subscription key and region for speech services.
  subscriptionKey = environment.speechSubscriptionKey;
  serviceRegion: string;
  authorizationToken: string;
  SpeechSDK: any;
  recognizer: any;
  speechConfig: any;
  audioConfig: any;
  speechText: string = '';

  constructor(private sanitizer: DomSanitizer, private dataService : DataService) { }

  onFileSelected(event) {
    let audioFile : any;
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      this.activeSecEvent.emit(true);
      const reader = new FileReader();
      audioFile = event.target.files[0];
      this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(audioFile));

      // create the push stream we need for the speech sdk.
      var pushStream = SpeechSDK.AudioInputStream.createPushStream();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        pushStream.write(this.srcResult)
        this.audioConfig = SpeechSDK.AudioConfig.fromStreamInput(pushStream);
        // Setup speech recognizer
        this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig);
        this.recognizer.startContinuousRecognitionAsync();
        this.recognizer.recognizing = (s, e) => this.recognizing(s, e);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }


  }

  recognizing = function (s, e) {

    // Indicates that recognizable speech was not detected, and that recognition is done.
    if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
      var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(e.result);
      let result = "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " NoMatchReason: " + SpeechSDK.NoMatchReason[noMatchDetail.reason] + "\r\n";
      console.log(result);
    } else {
      
    }
    this.speechText = e.result.text;
    speechSubject$.next(this.speechText);  
    this.updateData();
  };

    
  updateData() {       
    this.speechText = speechSubject$.getValue();
    var res = this.dataService.validateText(this.speechText);
    this.transcriptEvent.emit(this.speechText);
    this.scoreEvent.emit(res);
  }

  ngOnInit() {
    this.scoreEvent.emit({score:0});  
    this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(this.subscriptionKey, 'southeastasia');
    this.speechConfig.speechRecognitionLanguage = 'en-US';
  }

}
