import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

@Component({
  selector: 'app-upload-audio',
  templateUrl: './upload-audio.component.html',
  styleUrls: ['./upload-audio.component.css']
})
export class UploadAudioComponent implements OnInit {

  srcResult: any;
  audioSrc: any;
  
  @Output() scoreEvent = new EventEmitter<number>();
  @Output() transcriptEvent  = new EventEmitter<string>();

  //microsofot speech service == > subscription key and region for speech services.
  subscriptionKey = environment.speechSubscriptionKey;
  serviceRegion : string;
  authorizationToken : string;
  SpeechSDK : any;
  recognizer  : any;
  speechConfig : any;
  audioConfig: any;
  speechText: string = '';

  constructor(private sanitizer : DomSanitizer) { }

  onFileSelected(event) {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
     let audioFile = event.target.files[0];
     this.audioSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(audioFile));
     
      // create the push stream we need for the speech sdk.
    var pushStream = SpeechSDK.AudioInputStream.createPushStream();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        pushStream.write(this.srcResult)
        console.log(this.srcResult);
        
        
    this.audioConfig = SpeechSDK.AudioConfig.fromStreamInput(pushStream);
    // Setup speech recognizer
    this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig);  
    
    // The event recognized signals that a final recognition result is received.
    // This is the final event that a phrase has been recognized.
    // For continuous recognition, you will get one recognized event for each phrase recognized.
    this.recognizer.startContinuousRecognitionAsync();
    // The event recognized signals that a final recognition result is received.
    // This is the final event that a phrase has been recognized.
    // For continuous recognition, you will get one recognized event for each phrase recognized.
    this.recognizer.recognized = function (s, e) {
      
      // Indicates that recognizable speech was not detected, and that recognition is done.
      if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
        var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(e.result);
        let result = "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " NoMatchReason: " + SpeechSDK.NoMatchReason[noMatchDetail.reason] + "\r\n";
        console.log(result);
      } else { 
        console.log(e.result.text);
      }
      this.speechText += e.result.text; 
      console.log(this.speechText);
    };



      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }

    
  }

  ngOnInit() {

    this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(this.subscriptionKey, 'southeastasia');       
    this.speechConfig.speechRecognitionLanguage = 'en-US';   
    
    

  }

}
