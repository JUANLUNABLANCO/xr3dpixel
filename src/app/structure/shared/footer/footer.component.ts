import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {
  outputPath: any;
  constructor() { }

  ngOnInit() {
  }

  public HrefTo(site: string) {
    if (site === 'twitter') {
      this.outputPath = 'https://twitter.com/XR3DPixel';
    } else if (site === 'instagram') {
      this.outputPath = 'https://www.instagram.com/xr3dpixel_com/';
    }else if (site === 'facebook') {
      this.outputPath = 'https://www.facebook.com/xrtresdpixel';
    }else if (site === 'youtube') {
      this.outputPath = 'https://www.youtube.com/channel/UC4ixhOjEwpZV2CzrM-hTDcA';
    }else if (site === 'tumblr') {
      this.outputPath = 'https://xr3dpixel.tumblr.com/';
    }

    window.open(this.outputPath, '_blank');
    // document.location.href = this.outputPath;
  }
}
