function change(){
   var cards;
   var dupa = $(this).attr('data-panelid');
   $('.start').css('display','none');
   $('.score').css('display','block');
   switch (dupa) {
     case "easy":
      cards= [ 'geralt.png', 'jaskier.png', 'jaskier.png','triss.png', 'geralt.png', 'triss.png','iorweth.png','iorweth.png'];
      break;
     case "medium":
      cards= ['ciri.png', 'geralt.png', 'jaskier.png', 'jaskier.png', 'iorweth.png', 'triss.png', 'geralt.png', 'yen.png', 'ciri.png', 'triss.png', 'yen.png', 'iorweth.png'];
     break;
    case "hard":
      cards= ['ciri.png', 'geralt.png', 'jaskier.png', 'jaskier.png', 'iorweth.png', 'triss.png', 'geralt.png', 'yen.png', 'ciri.png', 'triss.png', 'yen.png', 'iorweth.png', 'radowid.png','radowid.png','draig.png','draig.png'];
     break;
   }

   console.log(cards);
   var visible_nr, j , shuffled;

   var oneVisible = false;
   var lock = false;

   var turnCounter = 0;


   var pairsLeft = cards.length*0.5;
   var i = cards.length-1;
   //losowanie kart
   while (--i > 0){
       j = Math.floor(Math.random() * i);
       shuffled = cards[j];
       cards[j] = cards[i];
       cards [i] = shuffled;
   }
   //Przypisywanie div'ów do zmiennych
   while (--i > 0){
       $('#c'+i);
   }
   //Tworzenie divów dla tablicy
   cards.forEach(function(_,index){
     $('<div class="card" id=c'+index+'/>', {}).appendTo('article');
   });

   //Pętla do obsługi kliknięcia
   cards.forEach(function(_,index){
       $('#c'+index).on('click', function() {revealCard(index); });
   })

   function revealCard(number){
       //alert(number);
       var obraz = "url(img/" + cards[number] + ")";
       var opacityValue = $('#c'+number).css('opacity');

       if (opacityValue!=0 && lock == false){

           lock=true;

           $('#c' +number).css('background-image', obraz).toggleClass('card').toggleClass('cardA');
           if (oneVisible == false){
               //first-card
               oneVisible = true;
               visible_nr = number;
               lock = false;
           }else{
               //second-card
               if(cards[visible_nr] == cards[number]){
                   //alert("para");
                   setTimeout(function(){hide2Cards(number, visible_nr)}, 750);
               }else{
                   //alert("pudło")
                    setTimeout(function(){restore2Cards(number, visible_nr)}, 1000);
               }
               turnCounter++;
               $('.score').html('Turn counter: ' +turnCounter);
               oneVisible=false;
           }
       }
   }

   function hide2Cards(nr1, nr2){
       $('#c'+nr1).css('opacity','0');
       $('#c'+nr2).css('opacity','0');
       pairsLeft--;
           if(pairsLeft==0){
             $('.board').html('<h1>You win! Done in '+turnCounter+' turns</h1><br/><button onclick="reloadPage()">Play again!</button>');
           }
       lock = false;
   }


   function restore2Cards(nr1,nr2){
       $('#c' +nr1).css('background-image', 'url(img/karta.png)').toggleClass('cardA').toggleClass('card');
       $('#c' +nr2).css('background-image', 'url(img/karta.png)').toggleClass('cardA').toggleClass('card');
       lock = false;
   }

}
$('.button').on('click', change);
function reloadPage(){
  location.reload();
}
