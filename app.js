(function($){
	$(function(){

		// fetch projects
		$.getJSON('pages/projects.json', function(data){
			var project_list = $('.mdl-menu[for="accbtn"]');
			$('.mdl-menu__item.project', project_list).remove();

			$.each(data.reverse(), function(index, project){
				project_list.prepend('<li class="mdl-menu__item project">'+ project.title +'</li>');
			});



			project_list.on('click', '.mdl-menu__item.project', function(e){
				$('#current-project, .mdl-layout-title').html($(this).text());
				fetch_project_apps($(this).index());
				fetch_project_info($(this).index());
			});

			$('.mdl-menu__item.project:first-child()', project_list).click();
		});

		function fetch_project_apps(project_id){
			// fetch projects (again)
			$.getJSON('pages/projects.json', function(data){
				var project = data[project_id];
				$('.costing').html(project.currency_entity + ' '+ addCommas(project.costing.toFixed(2)));
				$('.completion').html(project.completion_date);
				$('.issues').html((project.issues ==0 ? 'No' : project.issues) + ' Issues'+ (project.issues ==1 ? 's' : ''));
			});
		}

		function fetch_project_info(project_id){
			// fetch projects (again)
			$.getJSON('pages/projects.json', function(data){
				var project = data[project_id],
					app_nav = $('.jenca-navigation');
				$('.mdl-navigation__link.project-app', app_nav).remove();

				$.each(project.apps.reverse(), function(index, app){
					app_nav.prepend('<a class="mdl-navigation__link project-app" href="#"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">'+ app.icon +'</i>'+ app.title +'</a>');
				});

				// $('#current-project').html(project.apps[0].title);
			});
		}

		// bind some listeners
		$('.jenca-navigation').on('click', '.mdl-navigation__link.project-app', function(e){
			var app_id = $(this).index();

			$('#jenca-content').load('pages/app-'+ (app_id+1) +'.html', function(response, status, xhr){
				if(status == "error")
					$('#jenca-content').html('<h3>Page Not Found</h3>');
			});
		});
	});
})(jQuery);


function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}