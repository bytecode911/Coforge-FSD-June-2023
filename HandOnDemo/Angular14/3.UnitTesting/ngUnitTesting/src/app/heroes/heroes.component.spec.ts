import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent',() =>{
    let component:HeroesComponent;
    let HEROES;
    let mockHeroService;

   beforeEach(() =>{
     HEROES=[
        {id:1,name:'Spider Dude', strength:8},
        {id:2,name:'Wonderful woman', strength:24},
        {id:3,name:'Super Dude', strength:8},
           ];
 
           mockHeroService=jasmine.createSpyObj([
            "getHeroes",
            "addHero",
            "deleteHero"
        ]);
       component=new  HeroesComponent(mockHeroService);
       //component.ngOnInit();
   });

   describe('Delete',()=>{
    it('should remove the indicated hero from heroes list',() =>{
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes=HEROES;
       
       component.delete(HEROES[2]); 
   
     expect(component.heroes.length).toBe(2);
    });


    //xit('should call deleteHero',() =>{
        it('should call deleteHero',() =>{
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes=HEROES;
         
         component.delete(HEROES[2]); 
     
       //expect(mockHeroService.deleteHero).toHaveBeenCalled();
       expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      });

      //Homework
      it('indeed with observable on subsbcribe',() =>{
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes=HEROES;
         
         component.delete(HEROES[2]); 
     
       //expect(mockHeroService.deleteHero).toHaveBeenCalled();
       expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      });
      


      
  });
 
});

  