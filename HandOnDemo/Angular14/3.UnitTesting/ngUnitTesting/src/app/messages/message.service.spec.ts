import { MessageService } from "../message.service"

describe('MessageService',() =>{
    
    let service: MessageService;

    beforeEach(() =>{
        
    });
 
     it('shuold have no messages to start',() => {
        service= new MessageService();
        expect(service.messages.length).toBe(0);
     });

     it('shuold add a messages when addis callsed ',() => {
        service= new MessageService();
        service.add("message1 ");
        
        expect(service.messages.length).toBe(1);
     });

     it('shuold remove all messages when clear is called ',() => {
        service= new MessageService();
        service.add("message1 ");

        service.clear();
        
        expect(service.messages.length).toBe(0);
     });
});