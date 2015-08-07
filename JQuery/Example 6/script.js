$(document).ready(function() {

    $('div').click(function(){
        $(this).fadeOut('fast');
        });
    $('div').hover(function(){
        $('div').addClass('red');
});
});
