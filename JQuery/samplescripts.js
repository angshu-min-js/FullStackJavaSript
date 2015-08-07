$(document).ready(function(){
    $(this).keydown(function(){
         $('div').animate({left:'+=10px'},500);
        });

});

$(document).ready(function(){

    // Fill in the blanks! 1000 miliseconds
    $('img').animate({ top: '+=100px'}, 1000 );
});

//jQuery UI has an .effect() effect, and we are totally going to give it the input 'explode'.

$(document).ready(function(){
    $('div').click(function(){
        $(this).effect('explode');
        });
    });
// bounce effect, 3 times, 500 miliseconds
$(document).ready(function(){
  $('div').click(function(){
      $(this).effect('bounce',{times:3}, 500);
      });
  });
//slide

$(document).ready(function(){
    $('div').click(function(){
        $(this).effect('slide',{times:3}, 500);
        });
    });

  // collapsible

  $(document).ready(function() {
    $("#menu").accordion({collapsible: true, active: false});
});

// resizing

$(document).ready(function() {
    $('div').resizable();
    });

// selecting

$(document).ready(function() {
    $('ol').selectable();
    });

// drag move--sort

$(document).ready(function() {
    $('ol').sortable();
    });
