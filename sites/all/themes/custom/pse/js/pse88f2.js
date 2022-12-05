(function($) {
	Drupal.behaviors.pse = {
		attach: function(context, settings) {

			var $context = $(context);

			$('.page-node-38 .node .field-name-body .field-item').addClass('jumbotron');

			$('.page-approche-territoriale- .region-navigation .menu >li:nth-child(2)').addClass('active-trail');
			
			
			$('.node-rapport .field-type-file a').text('Télécharger');
			
			//$('.field-name-field-realisation-rattachee a').addClass('colorbox-node init-colorbox-node-processed-processed');
			
			//$("news-video-thumb");

			//LOADER
			$(".fakeloader").fakeLoader({
				timeToHide: 4000,
				spinner: "spinner1",
				bgColor: "#FFF"
			});

			//IFRAME
			$('iframe').css("width", 640 + "px");
			$('iframe').css("height", 360 + "px");

			//PLACEHOLDER NEWSLETTER
			$('#block-simplenews-17 .form-control').attr('placeholder',
				'Entrez votre email');

// 			$('.search-form .form-control').attr('placeholder',
// 				'Rechercher par mots clés');

			//SOUS MENU
			var etat = $(
				'.region-navigation .menu .active-trail .dropdown-menu, .region-navigation .menu .active .dropdown-menu'
			).css(
				'display');
			if (etat == 'block') {
				$('.bande').css('display', 'block');
			} else {
				$('.bande').css('display', 'none');
			}

			$(
				'.front .region-navigation .menu li, .node-type-actualite .region-navigation .menu li, .page-taxonomy .region-navigation .menu li, .page-search .region-navigation .menu li, .node-type-evenement .region-navigation .menu li, .node-type-rapport .region-navigation .menu li, .page-user .region-navigation .menu li, .page-node-99 .region-navigation .menu li, .page-sitemap .region-navigation .menu li, .page-node-98 .region-navigation .menu li, .page-documentation .region-navigation .menu li, .node-type-videos .region-navigation .menu li, .node-type-slideshow .region-navigation .menu li, .page-mediatheque .region-navigation .menu li'
			).mouseover(function() {
				$('.bande').css('display', 'block');
			});

			$(
				'.front .region-navigation .menu li, .node-type-actualite .region-navigation .menu li, .page-taxonomy .region-navigation .menu li, .page-search .region-navigation .menu li, .node-type-evenement .region-navigation .menu li, .node-type-rapport .region-navigation .menu li, .page-user .region-navigation .menu li, .page-node-99 .region-navigation .menu li, .page-sitemap .region-navigation .menu li, .page-node-98 .region-navigation .menu li, .page-documentation .region-navigation .menu li, .node-type-videos .region-navigation .menu li, .node-type-slideshow .region-navigation .menu li, .page-mediatheque .region-navigation .menu li'
			).mouseout(function() {
				$('.bande').css('display', 'none');
			});

			//ANNUL SURVOL SUR LES SOUS MENU RESO SOCIAU
			$('.front #block-menu-menu-social .menu li').mouseover(function() {
				$('.bande').css('display', 'none');
			});

			//POSITIONNEMENT FLECHE SLIDER
			// var tmp_posi = $('.logo').offset().left - 100;
			// $(
			// 	'#views_slideshow_cycle_teaser_section_slideshow-block .slideshow-description'
			// ).css('left', tmp_posi + "px");

			//RECUPERER LARGEUR NAVIGATEUR
			browser_width = $(window).width();
			if (browser_width >= 768) {
				//SCROLL TOP
				$(window).scroll(function() {
					if ($(this).scrollTop() > 100) {
						$('.scrollToTop').fadeIn();
					} else {
						$('.scrollToTop').fadeOut();
					}
				});

				$('.scrollToTop').click(function() {
					$('html, body').animate({
						scrollTop: 0
					}, 1200);
					return false;
				});

				//WOW JS
				//new WOW().init();
			}

			// Edit Title projects
			var tabNbr =  [];


			//console.log(tabNbr);

			$('#block-views-actualites-videos-block .news-video-thumb div a').append(
				'<span></span>');

			//SLICK NAV
			$('#block-system-main-menu .menu').slicknav();

			$(context).find('html').once().each(function () {

			$(".page-projets-phares .ui-accordion-content").each(function( index ) {

				var selectedLi =  $(this).find('.views-row');
				tabNbr[index] = selectedLi.length ;

			});

			$(".page-projets-phares .views-accordion-projets_phares-page-header a").each(function( index2 ) {

				var oldText =  $(this).text();
				//console.log(oldText);
				var newText =  oldText+"("+tabNbr[index2]+")";
				$(this).text(newText);
				//console.log(newText);

			});

			$(".page-reformes-phares .ui-accordion-content").each(function( index ) {

				var selectedLi =  $(this).find('.views-row');
				tabNbr[index] = selectedLi.length ;

			});

			$(".page-reformes-phares .views-accordion-reformes-page-header a").each(function( index2 ) {

				var oldText =  $(this).text();
				//console.log(oldText);
				var newText =  oldText+"("+tabNbr[index2]+")";
				$(this).text(newText);
				//console.log(newText);

			});

			//ANIMSITION
			 $('.not-logged-in .region-navigation .menu li a').addClass(
				'animsition-link');
			$('.not-logged-in .region-navigation .menu li a').attr(
				'data-animsition-out', 'fade-out-up-sm');
            
			$(".animsition").animsition({
				inClass: 'fade-in-up-sm',
				outClass: 'fade-out-up-sm',
				//inDuration: 3000,
				//outDuration: 2000,
				linkElement: '.animsition-link',
				loading: true,
				loadingParentElement: 'body',
				loadingClass: 'animsition-loading',
				unSupportCss: ['animation-duration',
					'-webkit-animation-duration',
					'-o-animation-duration'
				],
				overlay: false,
				overlayClass: 'animsition-overlay-slide',
				overlayParentElement: 'body'
			}); 
			//$(".animsition").delay(3000);

			//google.load("visualization", "1", {packages:["corechart"]});
			

		});
			$('#map').append('<div class="loader-map"></div>');
			google.setOnLoadCallback(drawVisualization);


			function drawVisualization() {
				var data = new google.visualization.DataTable();

				data.addColumn('string', 'Code Iso');
				data.addColumn('string', 'Region');
				data.addColumn('number', 'Nombres de projets');
				data.addColumn({type:'string', role:'tooltip', 'p':{'html':true}});
				var ivalue = new Array();
				var links = new Array();

				function listProject(obj){
					if(obj.length > 0){
						var data = "<h5 style='color : #FDC026; white-space: nowrap;'>Projets livrés </h5>";
						data += "<ul style='list-style-type: square; padding-left: 16px; margin-top: 20px;'>"
						for (var i = obj.length - 1; i >= 0; i--) {
							data += "<li style='list-style-type: square;'>" + obj[i] + "</li>";
						};
						data += "</ul>";
						//data += "<h5 style='color : #FDC026; margin: 20px 0px; white-space: nowrap;'>Total investissement</h5>";

						return data;
					}else{
						return "<strong>Total projet(0)</strong>";
					}
				};

				var jsonRegions = "";
				var fullRegions = {};

				//VAL :  Object {region: "Ziguinchor", iso: "SN-ZG", habitants: "0.70m", pib: "255.00Mds FCFA", titreProjet: ""}
				//$.getJSON(Drupal.settings.basePath + "/fr/projets.json",

                //console.log("PATH"+ JSON.stringify(Drupal.settings));
                 var tooltip_region_par_dafaut;
				$.getJSON("http://senegal-emergent.com"+ "/fr/projets.json",
				// $.getJSON(Drupal.settings.basePath + "/fr/projets.json",
					function(){
						//success
					})
					.done(function(json){
						jsonRegions = json.regions;
						$.each( jsonRegions, function( key, val ) {
							console.log("Val : ", val);
							if(fullRegions[''+val.region]){
								fullRegions[''+val.region].projets.push(val.titreProjet);
							}else{
							    fullRegions[''+val.region] = {
							    	"region" : val.region,
							    	"totalInvestissement" : val.totalInvest,
							    	"iso" : val.iso,
							    	"habitants" : val.habitants,
							    	//"pib" : val.pib,
							    	"projets" : new Array()
							    };
							}
						});

						$.each(fullRegions, function(key, val){
							links['' + val.iso + ''] = Drupal.settings.basePath + '/' + val.region;

							var details = "<strong>Habitants : </strong>" + val.habitants + "<br><br>" + listProject(val.projets);

							details += "<br><br>" + "<p style='padding-left: 16px;'>" +"<h5 style='color : #FDC026; margin: 10px 0px;'>Total investissement</h5>"+ val.totalInvestissement + " milliards de FCFA</p>";

							//"<h5 style='color : #FDC026; margin: 20px 0px; white-space: nowrap;'>Total investissement</h5>"
							 if(key == 'Dakar')
                                    tooltip_region_par_dafaut = details;
							/* "<strong>Habitants : </strong>" + val.habitants +
							"<br>" + "<strong>PIB : </strong>" + val.pib +
							"<br><br>" + listProject(val.projets); */

							data.addRows([
								[{
									v: val.iso,
									f: val.region
								}, val.region, val.projets.length, details]
							]);
						});

						var options = {
							region: 'SN',
							resolution: 'provinces',
							displayMode: 'regions',
							backgroundColor: {
								fill: '#FFFFFF',
								stroke: '#FFFFFF',
								strokeWidth: 0
							},
							colorAxis: {
								colors: [
									'#006400', '#7CFC00', '#00FF00', '#32CD32', '#008000', '#228B22'
								]
							},
							// sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
							datalessRegionColor: '#fff',
							enableRegionInteractivity: 'true',
							legend: 'none',
					        tooltip: {
					            isHtml: true
					        }
						};

						var basep = Drupal.settings.basePath + "sites/all/themes/custom/pse/pse_map/";
						var mapImages = new Array();
						mapImages["SN-DK"] = basep + "PSE_Dakar.jpg";
						mapImages["SN-DB"] = basep + "PSE_Diourbel.jpg";
						mapImages["SN-FK"] = basep + "PSE_Fatick.jpg";
						mapImages["SN-KA"] = basep + "PSE_Kaffrine.jpg";
						mapImages["SN-KL"] = basep + "PSE_kaolack.jpg";
						mapImages["SN-KE"] = basep + "PSE_Kedougou.jpg";
						mapImages["SN-KD"] = basep + "PSE_Kolda.jpg";
						mapImages["SN-LG"] = basep + "PSE_Louga.jpg";
						mapImages["SN-MT"] = basep + "PSE_Matam.jpg";
						mapImages["SN-SE"] = basep + "PSE_Sedhiou.jpg";
						mapImages["SN-SL"] = basep + "PSE_stlouis.jpg";
						mapImages["SN-TC"] = basep + "PSE_Tambacounda.jpg";
						mapImages["SN-TH"] = basep + "PSE_Thies.jpg";
						mapImages["SN-ZG"] = basep + "PSE_Ziguinchor.jpg";

						vex.defaultOptions.className = 'vex-theme-default';

						var chart = new google.visualization.GeoChart(document.getElementById(
							'map'));
						chart.draw(data, options);
						google.visualization.events.addListener(chart, 'select', function() {
							var selection = chart.getSelection();
							if (selection.length == 1) {
								var selectedRow = selection[0].row;
								var selectedRegion = data.getValue(selectedRow, 0);
								if (links[selectedRegion] != '') {
									// alert(links[selectedRegion]);
									// window.location = links[selectedRegion];
									vex.dialog.alert({
										unsafeMessage : '<img style="width: 100%; height: auto;" src="'+mapImages[selectedRegion]+'"/>'
									});
								}
							}
						});
						   //Set deffault tooptip
                            /*$ref = $("div[dir=ltr]");
                            var content = '<div class="custom_tooltip"><div class="google-visualization-tooltip" style="width: 450px; height: 395px; left: 110.229px; top: 5px;">';
                            content += '<ul class="google-visualization-tooltip-item-list" style="">';
                            content += '<li class="google-visualization-tooltip-item" style=""><span style="font-family: Arial; font-size: 13px; color: rgb(0, 0, 0); margin: 0px; text-decoration: none; font-weight: bold;">Dakar</span></li>';
                            content += '<li class="google-visualization-tooltip-item" style="">';
                            content += tooltip_region_par_dafaut;
                            content += '</li></ul></div>';
                            $ref.after(content);
                            $ref.hover(function () {
                                $custom_tooltip = $(this).siblings('.custom_tooltip');
                                if($custom_tooltip.length >0)
                                    $custom_tooltip.remove();
                            });*/

					}
				);
			}
            //end function
		//});

		}
	};
})(jQuery);
