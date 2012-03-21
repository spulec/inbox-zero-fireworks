console.log("testing");
var polling_timeout = 2000;
var prev_count = -1;

function print_mail_count() {
    var frame = top.document.getElementById('canvas_frame');

    var inbox_open = $("#canvas_frame").contents().find("a[title='Inbox']").parent().parent().parent().parent().hasClass("aiq");
    if (!inbox_open) {
        setTimeout('print_mail_count()', polling_timeout);
        console.log("inbox not open");
        return
    }
    var mail_count_div = $("#canvas_frame").contents().find("div[gh='tm']").find("span[class='Dj']")[0];
    
    // var mail_count_div = $("#canvas_frame").contents().find("div[aria-expanded='true']")[0];
    // var mail_count_div2 = $("#canvas_frame").contents().find("span[class='Dj']")[0];
    if (mail_count_div) {
        var mail_count_text = mail_count_div.children[2].textContent;
        var mail_count = parseInt(mail_count_text, 10);
        console.log("mail count set to " + mail_count + "    from: " + mail_count_text);
    } else {
        // If there is no div, then inbox is empty
        console.log("couldnt find div, setting to 0");
        mail_count = 0;
    }
    
    //var mail_count = frame.contentWindow.document.getElementById(':b2').children[0].children[2].textContent;
    console.log("mail count" + mail_count, "   prev_count:" + prev_count);
    
    if (mail_count == 0 && prev_count > 0) {
        console.log("at zero");
        start_fireworks();
    }
    
    prev_count = mail_count;
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


function load_js_file(filename){
  var script_url = chrome.extension.getURL(filename);
  var fileref = document.createElement('script');
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", filename);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

