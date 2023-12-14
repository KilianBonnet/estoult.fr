import { Component } from '@angular/core';
import { SidePictureComponent } from '../side-picture/side-picture.component';
import { PictureLoaderComponent } from '../picture-loader/picture-loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidePictureComponent, PictureLoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}