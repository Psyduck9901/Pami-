var cards = ['ciri.png', 'geralt.png', 'jaskier.png', 'jaskier.png', 'iorweth.png', 'triss.png', 'geralt.png', 'yen.png', 'ciri.png', 'triss.png', 'yen.png', 'iorweth.png'];
var i = cards.length, j , shuffled;

//losowanie kart
while (--i > 0){
    j = Math.floor(Math.random() * i);
    shuffled = cards[j];
    cards[j] = cards[i];
    cards [i] = shuffled;
}

var nr = 11;
while (--nr > 0){
    $('#c'+nr);
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;
var numer = 0;
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
            $('.score').html('Turn counter:' +turnCounter);
            oneVisible=false;
        }
    }
}

function hide2Cards(nr1, nr2){
    $('#c'+nr1).css('opacity','0');
    $('#c'+nr2).css('opacity','0');

    pairsLeft--;
    if(pairsLeft==0){
        $('.board').html('<h1>You win! Done in '+turnCounter+' turns</h1>');
    }

    lock = false;
}
function restore2Cards(nr1,nr2){
    $('#c' +nr1).css('background-image', 'url(img/karta.png)');
    $('#c' +nr1).toggleClass('cardA');
    $('#c' +nr1).toggleClass('card');

    $('#c' +nr2).css('background-image', 'url(img/karta.png)');
    $('#c' +nr2).toggleClass('cardA');
    $('#c' +nr2).toggleClass('card');

    lock = false;
}
