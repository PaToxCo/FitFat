import { Component, Renderer2, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var $: any; // Declarar jQuery para usarlo sin problemas

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit, OnDestroy {
  private scriptElements: HTMLScriptElement[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Cargar jQuery primero (necesario para Bootstrap)
    this.loadScript('../../../assets/lib/jquery/dist/jquery.js', false);  // No async para que cargue antes que Bootstrap
    
    // Cargar otros scripts
    this.loadScript('../../../assets/lib/bootstrap/dist/js/bootstrap.min.js');
    this.loadScript('../../../assets/lib/wow/dist/wow.js');
    this.loadScript('../../../assets/lib/flexslider/jquery.flexslider.js');
    this.loadScript('../../../assets/js/main.js');
  }


  ngOnDestroy(): void {
    // Limpiar los scripts cargados
    this.scriptElements.forEach((scriptElement) => {
      this.renderer.removeChild(document.body, scriptElement);
    });
  }

  private loadScript(src: string, isAsync: boolean = true): void {
    const scriptElement = this.renderer.createElement('script');
    this.renderer.setAttribute(scriptElement, 'src', src);
    this.renderer.setAttribute(scriptElement, 'type', 'text/javascript');
    this.renderer.setAttribute(scriptElement, 'async', isAsync ? 'true' : 'false');
    this.renderer.appendChild(document.body, scriptElement);
    this.scriptElements.push(scriptElement);
  }
}
