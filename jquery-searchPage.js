/*
	Just make sure you import: 
	<link rel="stylesheet" type="text/css" href="livesearch.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="livesearch.js"></script>
	<script type="text/javascript" src="paginate.js"></script>
*/

(function( $ ) {
    $.fn.searchPage = function( options ) {

        //default options.
        var settings = $.extend({
            bgimage: '',
            results: '',
            caption: false,
            searchButtonColor: '#007daa',
            placeholder: 'Search by category or keyword',
            leftmenu: {},
            rightmenu: {},
            perpage: 10
        }, options );

        //this variable stores mini page
        var storeminipage;

        //this stores the parameters of the form
        var parameters = {};

        switch(typeof settings.results) {
		    case 'object':
		        window.searchresults = settings.results;
		        break;
		    case 'string':
		        $.ajax({ 
			    cache: false,
			    url: settings.results, 
			    success: function( data ) {
			    			window.searchresults = data;
				    	}
				});
		        break;
		}


		//Thanx to Jeremy - https://coderwall.com/p/quv2zq/deparam-function-in-javascript-opposite-of-param
	    var deparam = function (querystring) {
	      // remove any preceding url and split
	      querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
	      var params = {}, pair, d = decodeURIComponent, i;
	      // march and parse
	      for (i = querystring.length; i > 0;) {
	        pair = querystring[--i].split('=');
	        params[d(pair[0])] = d(pair[1]);
	      }

	      return params;
	    };//--  fn  deparam


	    //this function refreshes or loads the results page
		function loadResults(query){
			
			//make sure the search results list is empty
			$('#resultsgohere').empty(); 
			
			//making sure the list of pagination buttons are removed
	        $('.pagination').remove(); 
		    
		    //fetch the query from the search form into a variable but only fetch its value
		    query = query[Object.keys(query)[0]];
		    var patt = new RegExp(query, 'gi');
		    $.each(window.searchresults, function( key, value ){ if( patt.test(value['title']) == true || patt.test(value['summary']) == true ){
		    	$('<li><h2><a href="' + value["url"] + '">'+value["title"]+'</a></h2><div><cite>'+value["url"]+'</cite><p>'+value["summary"].substring(0, 165)+' ...</p></div></li>').appendTo('#resultsgohere');
		    } });
		    if( $('#resultsgohere').find('li').length == 0 ){ 
		    	$('#resultsgohere').parent().html('No result found');
		    } else { 
		    	$('#resultsgohere').paginate({numberofitems: " + settings.perpage + "}); 
		    } 

		    if(searchform!=''){
	        	searchform.appendTo('.moresearch'); 
	        	searchform='';

	        	//give search input borders
	        	$(".search-wrapper input").css({
	        		'border':'1'
	        	});
	        }
		};

        var searchform='';

        var codeBlock = '<div class="minipage" id="searchform"></div>' + 
        '<div class="minipage" id="searchresults">' + 
			'<div class="row"><div class="col-6 moresearch"></div><div class="col-6"></div></div>' + 
			'<div class="row"><div class="col-2"></div><div class="col-8"><ol id="resultsgohere"></ol></div><div class="col-2"></div></div>' + 
		'</div>';

		$(this).html(codeBlock);

        $('<div class="bg"><ul class="top-menu top-menu-left"></ul><ul class="top-menu top-menu-right"></ul><div id="searchbox"><form class="search-wrapper cf"><input type="text" placeholder="' + settings.placeholder + '" name="q" required=""><button class="searchbutton" data-location="results"></button></form></div></div><div id="bgcover"></div><div id="overlay"></div>').appendTo('#searchform');

        //give the search button its color
        $('.search-wrapper button').css({
        	'background-color': settings.searchButtonColor
        });

        //fix the menus at the top
        if (settings.leftmenu.length != 0) {
        	$.each(settings.leftmenu, function( key, value ) {
			  $('.top-menu-left').append('<li><a href="' + value + '">' + key + '</a></li>');
			});
        }

        if (settings.rightmenu.length != 0) {
			$.each(settings.rightmenu, function( key, value ) {
			  $('.top-menu-right').append('<li><a href="' + value + '">' + key + '</a></li>');
			});
        }


        $('#searchform').css({
		    "height": "100%",
		    "margin": 0
        });

		$('.bg').css({
		    "background-image": "url('" + settings.bgimage + "')"
        });


        if (settings.caption==true){

			var metadata='';

	        var oImg = document.createElement("img");
			oImg.setAttribute('src', settings.bgimage);

			EXIF.getData(oImg, function() {
		        metadata = EXIF.getTag(this, "ImageDescription").split(';');
		    });

        	$('.bg').append('<div class="caption top-left">' + metadata[0] + '</br><small>' + metadata[1] + '</small></div>');

        	$('.bg').append('<div class="caption centered">' + metadata[2] + '</br><small>' + metadata[3] + '</small></div>');
		}


		function overlay_on() {
		    document.getElementById("overlay").style.display = "block";
		}

		function overlay_off() {
		    document.getElementById("overlay").style.display = "none";
		}

		$('.bg input[name="q"]').on( "blur", function() {
		  overlay_off();
		});

		$('.bg input[name="q"]').on( "focus", function() {
		  overlay_on();
		});

		//both the search page and the results page take the height of the window
		$('.minipage').css({"height":$(window).height()});

		//detach results page
		storeminipage = $('#searchresults').detach();

		//onclick
		$('.searchbutton').bind("click", function(event) {
			event.preventDefault();

		    parameters = "?" + $('.searchbutton').closest('form').serialize();
            
            parameters = deparam(parameters);
			
			switch($('.searchbutton').closest('.minipage').attr('id')) {

			    case 'searchform':
			    	//remove the overlay event and other events before moving it to the next page
			        $(".search-wrapper input").unbind(); 
			        
			        //detach the form to a variable
			        searchform = $(".search-wrapper").detach();

			        //remove the current minipage
			        $('.minipage').remove();

			        //bring in the stored minipage: #searchresults
			        $(storeminipage).hide().appendTo('body').fadeIn(1000);

			        //load the searchresults page
			        loadResults(parameters); 

			        break;

			    case 'searchresults':
			    	$('.minipage').hide().fadeIn(1000);
			    	//load the searchresults page
			        loadResults(parameters); 

			        break;
			}
		});

    };
 
}( jQuery ));