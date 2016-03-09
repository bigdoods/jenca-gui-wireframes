(function(d){
	$(function(){


		$('ul[for="projects-menu"] *[data-load-url]').click(function(e){
			$('#jenca-content').load($(this).attr('data-load-url'), function(response, status, xhr){
				if(status == "error")
					$('#jenca-content').html('<h3>Page Not Found</h3>');
			});
		});

		$('#jenca-content').on('click',  '#project-installed-app-list *[data-load-url]', function(e){
			if($('#app-content').attr('data-positioned'))
				$('#app-content').animate({left:$('body').outerWidth()}, 400, 'swing');
			else
				$('#app-content').css({left:$('body').outerWidth(), top:(-1 * $('#jenca-content').outerHeight())});


			$('#app-content').load($(this).attr('data-load-url'), function(response, status, xhr){
				if(status == "error")
					$('#app-content').html('<h3>Page Not Found</h3>');
				else
					$('#app-content').animate({left:(($('#jenca-content').outerWidth()- $('#jenca-content').width())/2)+75});

				$('#app-content').attr('data-positioned', 'positioned');
			});
		});

	});
})(jQuery);