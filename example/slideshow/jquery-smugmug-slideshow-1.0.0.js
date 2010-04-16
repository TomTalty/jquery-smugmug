(function($) {
	
var ss = $.slideShow = {};
var img = null;
var photos = [];
var photo_index = 0;

nextSlide = function() {
  img.attr("src", photos[photo_index]);
  photo_index += 1;
  if (photo_index >= photos.length)
    photo_index = 0;
};

$.fn.slideShow = function(options) {
	var albumID = options.albumID;
	var size = options.size || "Medium";
	var delay = options.delay || 3000;
	
	// Setup div
	this.empty();
	this.append("<img>");
	img = this.find("img");
	
	$.smugmug.login.anonymously(function() {
		$.smugmug.images.get({AlbumID: albumID, Heavy: 1}, function(images) {
			$.each(images.Images, function() {
				photos.push(this[size + "URL"]);
			});
			
	    setInterval( "nextSlide()", delay );
			nextSlide();
		});
	});
	
};

$.fn.smugmugCycle = function(options) {
	var albumID = options.albumID;
	var size = options.size || "Medium";
	
	// Setup div
	var div = this;

	$.smugmug.login.anonymously(function() {
		$.smugmug.images.get({AlbumID: albumID, Heavy: 1}, function(images) {
			$.each(images.Images, function() {
				var url = this[size + "URL"];
				div.append("<img src=\"" +  url + "\" />");
			});
			
			div.cycle(options);
		});
	});

};

$.fn.addSmugmugImages = function(options) {
	var albumID = options.albumID;
	var size = options.size || "Medium";
	
	// Setup div
	var div = this;
	
	$.smugmug.login.anonymously(function() {
		$.smugmug.images.get({AlbumID: albumID, Heavy: 1}, function(images) {
			$.each(images.Images, function() {
				var url = this[size + "URL"];
				// photos.push(this[size + "URL"]);
				console.log("Add img" + url);
				div.append("<img src=\"" +  url + "\" />");
			});
			
			if (options.complete)
		    options.complete();	
		  
		});
	});

};

})(jQuery);

