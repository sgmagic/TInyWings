import {Directive,Input,OnDestroy,TemplateRef,ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ScreenService} from '../services/screen.service';

@Directive({selector: '[screenBelowLarge]'})
export class ScreenBelowLarge{
    public hasView=false;
    public screenSubscription: Subscription;
    constructor(public viewContainer: ViewContainerRef,
                public template:TemplateRef<Object>,
                public screenService: ScreenService) {

      this.screenSubscription =  screenService.resize$.subscribe(() => this.onResize());
    }

    @Input()
    set screenBelowLarge(condition){
        condition = this.screenService.screenWidth <= this.screenService.largeBreakingpoint;

        if(condition && !this.hasView){
            this.hasView=true;
             this.viewContainer.createEmbeddedView(this.template);
        } else if(!condition && this.hasView){
            this.hasView=false;
            this.viewContainer.clear();
        }
    }

     ngOnDestroy(){
        this.screenSubscription.unsubscribe();
    }

    onResize(){
        this.screenBelowLarge=false;
    }
}