(function( $ ) {
    $.fn.paginate = function( options ) {

        //default options.
        var settings = $.extend({
            numberofitems: 5
        }, options );


        var itemscount = settings.numberofitems;

        function getpageNumber(itemindex,numberofitems){
        	var count=0;
        	//for example if number of items is 5, page number is determined by the number of times 5 is subtracted from the index number
        	while(itemindex >= 0){
        		itemindex = itemindex - numberofitems;
        		count = count + 1;
        	}
        	return count;
        }

        //determine the number of pages
        var numberofpages = getpageNumber($(this).children().length - 1, settings.numberofitems);

        $(this).children().each(function(index){
        	$(this).addClass( "pageelement"+ getpageNumber(index, settings.numberofitems));
        });

        //create the pagination buttons
        var pages = '';

        for(i=1;i<=numberofpages;i++){
        	$(".pageelement"+i).wrapAll("<div id='page" + i + "' class='pages' ></div>");
        	pages = pages + '<a href="#" class="nav">' + i + '</a>';
        }

        pages = '<div class="center"><div class="pagination" >' + pages + '</div></div>';
        
        //insert pagination buttons after the list
        $(pages).insertAfter($(this));

        //hide
        $('.pages').each(function( index ) {

          if(index!=0){ $( this ).hide(); }

        });



        $('.pagination a').click(function(){
            $('.pages').hide();

            $('#page' + $(this).text()).fadeIn();
        });

    };
 
}( jQuery ));