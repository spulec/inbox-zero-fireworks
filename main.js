var polling_timeout = 2000;
var prev_count_zero = true; // Assume you were inbox zero so we don't firework the first time

function print_mail_count() {
    var frame = top.document.getElementById('canvas_frame');

    // Bug: title goes to 'Inbox (5)'
    var inbox_open = $("#canvas_frame").contents().find("a[title='Inbox']").parent().parent().parent().parent().hasClass("aiq");
    if (!inbox_open) {
        setTimeout('print_mail_count()', polling_timeout);
        //console.log("inbox not open");
        return
    }
    
    var mail_count_div = $("#canvas_frame").contents().find("div[gh='tm']").find("div[class='Di']")[0];
    if (mail_count_div) {
        //console.log("couldnt find div, setting to 0");
        mail_count_zero = true;
    } else {
        // If there is no div, then inbox is not empty
        mail_count_zero = false;
    }
    
    //console.log("mail count: " + mail_count_zero, "   prev_count: " + prev_count_zero);
    if (mail_count_zero && !prev_count_zero) {
        console.log("at zero");
        start_fireworks();
    }
    
    prev_count_zero = mail_count_zero;
    setTimeout('print_mail_count()', polling_timeout);
}
setTimeout('print_mail_count()', polling_timeout);

function start_fireworks() {
    var height = $(window).height() - 280;
    var width = $(window).width()
    $("body").prepend('<canvas id="mycanvas" style="position:fixed;" height="' + height + '"; width="' + width + '";">');
    FireworkDisplay.launchText("INBOX ZERO!");
    $("#mycanvas").bind('click', function(e){
        $("#mycanvas").remove();
    });
}
