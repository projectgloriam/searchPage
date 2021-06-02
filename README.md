# searchPage
A jQuery plugins and css files that creates a search page like Bing. 
It takes your search text and produces a results page, like Bing.

## To use this plugin

```
<link rel="stylesheet" type="text/css" href="jquery-searchPage.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="paginate.js"></script>
<script type="text/javascript" src="exif.js"></script> <!--For image captions-->
<script type="text/javascript" src="jquery-searchPage.js"></script>
```
Example 
`````````
//object of results
var schresults = [
  {title:"Operating System", summary:"Operating System solved", url:"www.solution.com"},
  {title:"Operating System", summary:"Operating System solved", url:"www.solution.com"},
  {title:"Operating System", summary:"Operating System solved", url:"www.solution.com"},
  {title:"Operating System", summary:"Operating System solved", url:"www.solution.com"},
  {title:"Operating System", summary:"Operating System solved", url:"www.solution.com"},
  {title:"UPS", summary:"UPS solved hehe", url:"www.solution.com"},
  {title:"UPS", summary:"UPS solved hehe", url:"www.solution.com"},
  {title:"UPS", summary:"UPS solved hehe", url:"www.solution.com"},
  {title:"UPS", summary:"UPS solved hehe", url:"www.solution.com"},
  {title:"UPS", summary:"UPS solved hehe", url:"www.solution.com"}
];


$(function() {
  $('body').searchPage({
    bgimage: 'img_parallax.jpg', // use any nice image
    results: schresults, //either use an object (will filter items) or a url for ajax calls
    caption: true, // Add text to the title property of the image seperated by ; for each title and description e.g. title;description;secondtitle;seconddescription
    searchButtonColor: '#007daa',
    placeholder: 'Search by category or keyword',
    leftmenu: {'Hello':'#','Hi':'#'},
    rightmenu: {'Sign out':'http://www.google.com'},
    perpage: 10
  });
});

`````````

Have fun!
