$(document).ready(function () {
    // handle autocomplete when user input city name 
    $('#inputCity').autocomplete({
        source: function (req, res) {
            // send request to server side
            $.ajax({
                url: 'doctors',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    act: "req-source",
                    search: req.term
                },
                // successful get response from server
                success: function (result) {
                    //console.log("success from autocomplete")
                    res($.map(result, function (obj, key) {
                        //console.log("this is obj name " + obj.cityName)
                        return { label: obj.cityName }
                    }));
                },
                error: function (result) {
                    console.log(result)
                }
            });
        },
        minLength: 2,
        focus: function (event, ui) {
            event.preventDefault();
        },
        select: function (event, ui) {
            event.preventDefault();
            $('#inputCity').val(ui.item.label);
        }
    });

    // handle click submit button action 
    $('#bnt').click(function (event) {
        event.preventDefault();
        var cityNameVal = $('#inputCity').val();
        var distanceVal = $('#distances').val();

        if (cityNameVal == '') {
            alert('Please provide a city name!')
            return
        }

        var obj = {
            city: cityNameVal,
            act: "Cityinput",
            dist: distanceVal
        }
        // send request to server side
        $.ajax({
            url: '/doctors',
            type: 'POST',
            dataType: 'JSON',
            data: obj,
            // successful get response from server
            success: function (result) {
                //console.log("success")
                //console.log(result)
                // find the matched result 
                if (result.length > 0) {
                    $('#count-here').html("Found " + result.length + " in-network doctors.");
                    $('#table-here').removeAttr('hidden');
                    var source = $('#resultTemplate').html();
                    var template = Handlebars.compile(source);
                    var html = template({ data: result });
                    $('#table-here').html(html);
                }
                // no matched result
                else if (result.length == 0) {
                    $('#count-here').html("Found " + result.length + " in-network doctors.");
                    $('#table-here').attr('hidden', true);
                }
            },
            error: function (result) {
                console.log(result)
            }
        })
    })
});
