var currentLocation = window.location.origin;
var idVideoGlobal;

$(document).on('click', '.video', function() {
    var videoClickedHref = $(this).val();
    var idVideo = $(this).attr('id');
    idVideoGlobal = idVideo;
    console.log(videoClickedHref);
    $('#videoClicked').attr('src', videoClickedHref);

    $.get(currentLocation + '/api/' + idVideo + '/', function(data) {
        $('#notes').empty();
        $('#notes').append('<h2>' + data.title + '</h2>');
        $('#notes').append('<input id="titleinput" name="title" >');
        $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');
        $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');
    });

    $.get(currentLocation + '/notesFinder/' + idVideoGlobal + '/', function(data) {
    	$('#title').empty();
    	$('#body').empty();
    	 for(i=0;i<data.length;i++){
            $('#title').html(data[i].title);
            $('#body').html(data[i].body);
        }
        
    });
});


$(document).on('click', '#savenote', function() {
    var thisId = $(this).attr('data-id');
    var data = {
        title: $('#titleinput').val(),
        body: $('#bodyinput').val(),
        idVideoGlobal: idVideoGlobal
    }

    $.post(currentLocation + "/notes/" + thisId + '/', data, function(err, res) {
        console.log(res);
    });
    $('#titleinput').val("");
    $('#bodyinput').val("");
});
