import { Component, Renderer2, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var $: any; // Declarar jQuery para usarlo sin problemas

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private scriptElements: HTMLScriptElement[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadScript('../../../assets/js/vendor/jquery-1.12.4.min.js', false);
    this.loadScript('../../../assets/js/vendor/owl.carousel.min.js', false);

    const scripts = [
      '../../../assets/js/vendor/bootstrap.min.js',
      '../../../assets/js/vendor/tether.min.js',
      '../../../assets/js/vendor/jquery.slicknav.min.js',
      '../../../assets/js/vendor/swiper.min.js',
      '../../../assets/js/vendor/smooth-scroll.min.js',
      '../../../assets/js/vendor/jquery.ajaxchimp.min.js',
      '../../../assets/js/vendor/wow.min.js',
      '../../../assets/js/script.js',
    ];

    scripts.forEach((src) => this.loadScript(src));
  }

  ngAfterViewInit(): void {
    $(document).ready(() => {
      $('#review-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 3
          }
        }
      });
    });
    
  }

  ngOnDestroy(): void {
    this.scriptElements.forEach((script) => script.remove());
  }

  private loadScript(src: string, isAsync: boolean = true): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = isAsync;
    this.renderer.appendChild(document.body, script);
    this.scriptElements.push(script);
  }
}
