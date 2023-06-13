describe('my first test',() =>{
let sut;

 beforeEach(() =>{
    sut={}; 
  });
it('should be true if ture',() =>{

    //arrange
    sut.a=false;

   // act
   sut.a=true;

   //expect
   expect(sut.a).toBe(true);
   });

});
//my first test should be true if ture

//user service ->getUser method -> should retreive the correct user
// describe('user service',() =>{
//     describe('getUser method', () =>{
//         it('It should retrieve the correct user')
//     });
// });





