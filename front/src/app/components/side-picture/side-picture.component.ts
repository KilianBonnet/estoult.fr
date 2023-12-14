import { Component } from '@angular/core';


@Component({
  selector: 'app-side-picture',
  standalone: true,
  imports: [],
  templateUrl: './side-picture.component.html',
  styleUrl: './side-picture.component.css'
})
export class SidePictureComponent {
  sidePictures: string[]  = ["flandre", "marisa", "reimu"];
  currentPicturePath: string;

  constructor() {
    const currentPictureIndex: number = Math.floor(Math.random() * (this.sidePictures.length - 0)) + 0;
    this.currentPicturePath = `./assets/side-picture-images/${this.sidePictures[currentPictureIndex]}.png`;
  }
}
