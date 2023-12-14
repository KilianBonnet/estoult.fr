import { Component } from '@angular/core';
import { SidePictureComponent } from '../side-picture/side-picture.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidePictureComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}