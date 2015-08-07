$(document).ready(function(){


     $('#text').click(function() {
        //$(this).addClass("highlighted");
        $(this).toggleClass("highlighted");
        $('div').height('200px')
        $('div').width('200px')
        $('div').css('border-radius','10px')
    });
    });
