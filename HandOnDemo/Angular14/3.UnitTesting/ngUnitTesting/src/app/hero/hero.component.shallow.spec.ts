import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent (shallow Teste)",() =>{
    let fixture:ComponentFixture<HeroComponent>;

    beforeEach(() =>{
      TestBed.configureTestingModule({
        declarations: [HeroComponent],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture=TestBed.createComponent(HeroComponent);
     // fixture.componentInstance.
    });

    it("should have the correct hero",() =>{
        fixture.componentInstance.hero={id:3,name:"SuperDude", strength:8};
   //   fixture.detectChanges();
    
        expect(fixture.componentInstance.hero.name).toEqual("SuperDude");
   });
 
   it("should render the hero name in ancher tag",() =>{
    fixture.componentInstance.hero={id:1,name:"SuperDude", strength:3};
    fixture.detectChanges();

    let deA=fixture.debugElement.query(By.css('a'));

    //or
    expect(deA.nativeElement.textContent).toContain("SuperDude");
    // or  expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain("SuperDude"); 

//  or line 30 or  line 32
    //expect(fixture.nativeElement.querySelector("a").textContent).toContain("SuperDude");
    });


});