import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NotesInfo} from '../../../models/notes';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'subjob-note',
  templateUrl: './subjobs-note.component.html',
})


export class SubJobsNoteComponent implements OnInit {
  notes: NotesInfo[];
  operationalNotes: NotesInfo[];
  financialNotes: NotesInfo[];
  subContractorNotes: NotesInfo[];
  internalNotes: NotesInfo[];
  category: string;
  description: string;
  isValidNotes: boolean=true;
  isValidDesc: boolean=true;
  isSelected: boolean=false; 
  @Output() addNotes = new EventEmitter<any>();
  @Input()
  set note(note: NotesInfo[]){
    this.notes=note;
    if(this.notes!=undefined && this.notes!=null && this.notes.length>0){
      this.operationalNotes=this.notes.filter(x => x.category == "Operational Notes");
      this.financialNotes=this.notes.filter(x => x.category == "Financial Notes");
      this.subContractorNotes=this.notes.filter(x => x.category == "SubContractor Notes");
      this.internalNotes=this.notes.filter(x => x.category == "Internal Notes");
    }
  }

  constructor() {
  }
  
  display: boolean = false;
    showDialog() {
      //this.category="";
      this.description="";
      this.isValidDesc=true;
      this.isValidNotes=true;
      this.display = true;
  }
 
  ngOnInit(): void {

  }

  saveNotes(){
    if(this.category==undefined || this.description==undefined || this.category.replace(/ /g, '')=="" || this.description.replace(/ /g, '')==""){
      if(this.category==undefined || this.category.replace(/ /g, '')==""){
        this.isValidNotes=false;
      }
      else{
        this.isValidNotes=true;
      }
      if(this.description==undefined || this.description.replace(/ /g, '')==""){
        this.isValidDesc=false
      }
      else{
        this.isValidDesc=true;
      }
    }
    else{
      this.isValidNotes=true;
      this.isValidDesc=true;
      this.addNotes.emit({
        note: this.description,
        category: this.category
      });
     // this.category="";
      this.description="";
      this.display=false;
    }
  }
  
  onTabChange($event){
    if($event.index==0){
      this.category="";
      this.isSelected=false;
    }
    else if($event.index==1){
      this.category="Operational Notes";
      this.isSelected=true;
    }
    else if($event.index==2){
      this.category="Financial Notes";
      this.isSelected=true;
    }
    else if($event.index==3){
      this.category="SubContractor Notes";
      this.isSelected=true;
    }
    else if($event.index==4){
      this.category="Internal Notes";
      this.isSelected=true;
    }
    
  }
}
