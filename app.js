(function(d){
	$(function(){


		$('*[data-load-url]').click(function(e){
			$('#jenca-content').load($(this).attr('data-load-url'), function(response, status, xhr){
				if(status == "error")
					$('#jenca-content').html('<h3>Page Not Found</h3>');
			});
		});

	});
})(jQuery);