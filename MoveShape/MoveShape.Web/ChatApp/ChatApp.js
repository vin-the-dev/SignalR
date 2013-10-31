/// <reference path="../Scripts/jquery-1.7.2.js" />
/// <reference path="../Scripts/jquery.signalR-1.0.1.js" />
$(function () {
    var hub = $.connection.chatApp,
        $shape = $("#shape"),
        $clientCount = $("#clientCount"),
        $txtChat = $("#txtChat"),
        $btnSend = $("#btnSend"),
        body = window.document.body;
    
    $.extend(hub.client, {
        broadcastMessage : function (name, message) {
            // Html encode display name and message. 
            var encodedName = $('<div />').text(name).html();
            var encodedMsg = $('<div />').text(message).html();
            // Add the message to the page. 
            $('#messages').append('<li><strong>' + encodedName
                + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
        },
        clientCountChanged: function (count) {
            $clientCount.text(count);
        }

    });

    $.connection.hub.start().done(function () {
        $('#btnSend').click(function () {
            // Call the Send method on the hub. 
            hub.server.sendChat($('#txtName').val(), $('#txtchat').val());
            // Clear text box and reset focus for next comment. 
            $('#txtchat').val('').focus();
        });
    });
});