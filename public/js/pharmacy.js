$(document).ready(function(){
    // handle autocomplete when user input city name 
    $('#inputCity').autocomplete({
        source: function(req,res){
            // send request to server side
            $.ajax({
                url: 'pharmacy',
                type: 'POST',
                dataType: 'JSON',
                data:{
                    act: "req-source",
                    search: req.term
                },
                // successful get response from server
                success: function(result){
                    //console.log("success from autocomplete")
                    res($.map(result, function(obj, key){
                        //console.log("this is obj name " + obj.cityName)
                        return { label: obj.cityName}
                    }));
                },
                error: function(result){
                    console.log(result)
                }
            });
        },
        minLength: 2,
        focus: function(event, ui){
            event.preventDefault();
        },
        select: function(event, ui){
            event.preventDefault();
            $('#inputCity').val(ui.item.label);
        }
    });

    // handle click submit button action 
    $('#bnt').click(function(event){
        event.preventDefault();
        var cityNameVal = $('#inputCity').val();
        var distanceVal = $('#distances').val();
    
        if(cityNameVal==''){
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
            url: 'pharmacy',
            type: 'POST',
            dataType: 'JSON',
            data: obj,
            // successful get response from server
            success: function(result){
               addKey(result);
               getDist(result, cityNameVal,distanceVal);
            },
            error: function(result){
                console.log(result)
            }
        });
    })
});


function addKey(data){
    for(var i=0; i<data.length; i++){
        data[i].dist = 0;
    }
};


async function getDist(data, ori, distval){
    $('#count-here').html("Loading the data...");
    $('#table-here').attr('hidden',true);
    for(var i=0; i<data.length; i++){
        var service = new google.maps.DistanceMatrixService();
        var awesomePromise = service.getDistanceMatrix({
            origins: [ori],
            destinations: [data[i].addr + ', ' + data[i].city + ', ' + data[i].st],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        });
        var res = await awesomePromise;
        data[i].dist = Number(res.rows[0].elements[0].distance.text.split(' ')[0]);
    }
    data.sort((a,b) => a.dist - b.dist);
    console.log(data);
    
    
    var list = [];
    if(distval==0 && data.length > 0){
        $('#count-here').html("Found "+ data.length + " in-network pharmacies.");
        $('#table-here').removeAttr('hidden');
        var source = $('#resultTemplate').html();
        var template = Handlebars.compile(source); 
        var html = template({data: data});
        $('#table-here').html(html);
    }
    else if (distval!=0 && data.length!=0){
        for(var i=0; i<data.length; i++){
            if(data[i].dist <= distval){
                list.push(data[i]);
            }
            else if(data[i].dist > distval){
                break;
            }
        }
        $('#count-here').html("Found "+ list.length + " in-network pharmacies.");
        $('#table-here').removeAttr('hidden');
        var source = $('#resultTemplate').html();
        var template = Handlebars.compile(source); 
        var html = template({data: list});
        $('#table-here').html(html);
    }
    // no matched result
    else if(data.length==0){
        $('#count-here').html("Found "+ data.length + " in-network pharmacies.");
        $('#table-here').attr('hidden',true);
    }

};

