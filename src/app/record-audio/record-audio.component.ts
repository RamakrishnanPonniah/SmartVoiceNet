import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { AudioRecordingService } from './audio-recording.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DataService } from '../shared/data.service';
import { SpeechToTextService, RecognitionResult  } from '../_shared/services/speech-to-text.service';

DataService 

@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.css']
})
export class RecordAudioComponent implements OnInit, OnDestroy {
  
  score: number;  
  audioIconVisibility = true;
  recordedAudioUrl : SafeResourceUrl;

  @Output() scoreEvent = new EventEmitter<number>();
  @Output() transcriptEvent  = new EventEmitter<string>();
  @Input() thresholdVal : number;

  public transcript : string = '';
  public readonly language = 'en-US';

  constructor(
    private audioRecordingService : AudioRecordingService,
    private sanitizer: DomSanitizer,
    public speech: SpeechToTextService
  ) { }

  ngOnInit() {
    
    this.scoreEvent.emit(0);
    this.speech.Result.subscribe((result: RecognitionResult) => {
      console.log(result);
      this.transcriptEvent.emit(result ? result.transcript : '');
    });
  }

  ngOnDestroy() {
    this.abortRecording();
  }

  abortRecording() {
    if (this.audioIconVisibility) {
      this.audioIconVisibility = false;
      this.audioRecordingService.abortRecording();
    }
  }

  startRecording() { 

    this.audioIconVisibility = false;
      this.speech.requestListening(this.language);

    /*if (this.speech.IsListening) {
      this.speech.stopListening();
      this.audioIconVisibility = true;
    } else {
      this.audioIconVisibility = false;
      this.speech.requestListening(this.language);
    }*/
    
    /*   
    this.recordedAudioUrl = null;
    this.scoreEvent.emit(0);
    this.audioRecordingService.startRecording();*/

  }

  stopRecording() { 
    /*this.audioRecordingService.stopRecording();
     this.audioRecordingService.getRecordedBlob().subscribe( audioFile => {
        console.log(audioFile);
        this.recordedAudioUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(audioFile.blob));
        console.log('audio file size is ' + (audioFile.blob.size/1024/1024)+ 'MB');
        console.log(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(audioFile.blob)));
        this.scoreEvent.emit(75);
     });*/
     this.speech.stopListening();
     this.audioIconVisibility = !this.audioIconVisibility;

  }

  

}
