/* global SockJS, Stomp */
var stompClient = null;

export function connect(id) {
    var socket = new SockJS('https://connected-api-y0cx.onrender.com/websocket-sockjs');
  
    stompClient = Stomp.over(socket);
    

   setTimeout(()=>{
    if (stompClient.connected===true)
    console.log(stompClient, 'test')
    {
      stompClient.connect({}, function(frame) {
 

          
        stompClient.subscribe('/user/' + id + '/queue/messages', function(message) {
               var jsonObject = JSON.parse(message.body);
             
               showMessage(jsonObject);
           });
         
        
           stompClient.subscribe('/user/' + id + '/queue/notifications', function(notification) {
               var jsonObject = JSON.parse(notification.body);
               
               showNotification(jsonObject);
           });
   
        
   
        
      
       });

    }

   }, 200)
}



export function showMessage(message) {
  if (message!==undefined){

    console.log(message)
    
    
    return message.data.content 
  }
  else{
    
    return null
  }
}

export function showNotification(notification) {
  if (notification!==undefined){
 
    
    return notification.notificationType 
  }
  else{
   
    return null
  }

}

export function sendMessage(sender, receiver, chatRoomId, messageSent) {
   stompClient.send("/app/chat", {}, JSON.stringify({
    senderCustomerId: sender,
    receiverCustomerId: receiver,
    content: messageSent,
    messageType: "TEXT",
    chatRoomId: chatRoomId
  }));
  

  
}