import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    template:`
    <div id="overlay-loading" [hidden]="!showLoad">
        <div id="loading-area">
            <div class="circle-load">
                <div class="preloader-wrapper small active">
                    <div class="spinner-layer spinner-red-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
            <h6>Carregando...</h6>
        </div>
    </div>`
})

export class LoaderComponent {

    @Input()
    showLoad: boolean;
}