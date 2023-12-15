import { Component } from '@angular/core';
import { SidePictureComponent } from '../side-picture/side-picture.component';
import { PictureLoaderComponent } from '../picture-loader/picture-loader.component';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [SidePictureComponent, PictureLoaderComponent, HeaderComponent]
})

export class HomeComponent {

}