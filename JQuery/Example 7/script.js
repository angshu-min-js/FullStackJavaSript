$(document).ready(function(){

  $('div').hover(
    function(){
     $(this).addClass('active')
    },
    function(){
     $(this).removeClass('active');
    }
  );
  $('input').focus(function(){
          $(this).css('outline-color','#FF0000')
          });
});
