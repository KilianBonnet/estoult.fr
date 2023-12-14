import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-picture-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture-loader.component.html',
  styleUrl: './picture-loader.component.css'
})

export class PictureLoaderComponent {
  @Input() url: string = '';
  @Input() alt: string = '';
  @Input() width: number = 0;
  @Input() height: number = 0;

  public imageLoaded: boolean = false;

  public handleImageLoad(): void {
    this.imageLoaded = true;
  }
}
