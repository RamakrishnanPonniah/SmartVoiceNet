import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { AudioRecordingService } from './audio-recording.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';


import { DataService } from '../_shared/services/data.service';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { environment } from 'src/environments/environment';

let speechSubject$ = new BehaviorSubject('');


@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.css']
})
export class RecordAudioComponent implements OnInit, OnDestroy {
  
  score: number;  
  audioIconVisibility = true;
  recordedAudioUrl : SafeResourceUrl;
  
  @Output() scoreEvent = new EventEmitter<any>();
  @Output() transcriptEvent  = new EventEmitter<string>();
  @Input() thresholdVal : number;

  public transcript : string = '';
  public readonly language = 'en-US';

  //microsofot speech service == > subscription key and region for speech services.
  subscriptionKey = environment.speechSubscriptionKey;
  serviceRegion : string;
  authorizationToken : string;
  SpeechSDK : any;
  recognizer  : any;
  speechConfig : any;
  audioConfig: any;
  speechText: string = '';

  constructor(
    private audioRecordingService : AudioRecordingService,
    private sanitizer: DomSanitizer,
    private dataService: DataService
  ) { }

  ngOnInit() {
    
    this.scoreEvent.emit({score:0});    
   
    this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(this.subscriptionKey, 'southeastasia');
       
    this.speechConfig.speechRecognitionLanguage = 'en-US';

    this.audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    // Setup speech recognizer
    this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig);      

   
  }

 
  ngOnDestroy() {
    
  }

 
  startRecording() { 
    
    
    this.speechText = '';
    this.transcriptEvent.emit(this.speechText);
    this.scoreEvent.emit({score:0});   
    //this.speechText = '';
    //this.transcriptEvent.emit(this.speechText);
    this.audioIconVisibility = false;
    this.recognizer.startContinuousRecognitionAsync();
    this.recognizer.recognized = (s, e) => this.recognized(s, e);
    
    this.recognizer.speechEndDetected = (sender: any, event: any) => {
      console.log('speech end detected');// this is a separate function that starts up speech recognition.
    };
    
  }

  // The event recognized signals that a final recognition result is received.
    // This is the final event that a phrase has been recognized.
    // For continuous recognition, you will get one recognized event for each phrase recognized.
    recognized = function (s, e) {
      
      // Indicates that recognizable speech was not detected, and that recognition is done.
      if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
        var noMatchDetail = SpeechSDK.NoMatchDetails.fromResult(e.result);
        let result = "(recognized)  Reason: " + SpeechSDK.ResultReason[e.result.reason] + " NoMatchReason: " + SpeechSDK.NoMatchReason[noMatchDetail.reason] + "\r\n";
        console.log(result);
      } else { 
        //console.log('recognizing text', e.result.text);
        //this.transcriptEvent.emit(e.result.text);
      }
      this.speechText += e.result.text;
      speechSubject$.next(this.speechText);  
      this.updateData();
    };

  
  updateData() {       
    let text = speechSubject$.getValue();
    this.speechText = text.replace('undefined', '');
    var res = this.dataService.validateText(this.speechText);
    this.transcriptEvent.emit(this.speechText);
    this.scoreEvent.emit(res);
  }

  stopRecording() { 
    console.log('Stopped listening...')
    this.recognizer.stopContinuousRecognitionAsync();
    this.audioIconVisibility = !this.audioIconVisibility;
    //this.updateData();
    
      
  }








  

}
