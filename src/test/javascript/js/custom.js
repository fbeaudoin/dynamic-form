jQuery(document).ready(function () {
	
	/* Uniform
	 ------------------------------------------------------------------------*/
	$("select, input:checkbox, input:radio, input:file").uniform();
	
	/* Carousel
	 ------------------------------------------------------------------------*/
	 
	/* Montre le premier item */
	jQuery('.item-panel:eq(0)').show();
	
	/* Ajoute une classe active au premier item */
	jQuery('.item-list li:first-child').addClass('active');
	
	/* Evenement sur le clic */
	jQuery('.item-list li').click(function(){
	    if (!jQuery(this).is('.active')) {
			var index = jQuery(this).index();
			jQuery('.item-list li.active').removeClass('active');
			jQuery('.item-panel').hide();
			jQuery('.item-panel:eq('+ index +')').fadeIn(400, function(){
			    if (jQuery.browser.msie){ 
			        this.style.removeAttribute('filter')
			    }
			});
			jQuery(this).addClass('active');
		}
	})
	
	/* Carousel */
	jQuery('.item-list').Carousel({
		display_num : 5,
		element_height : 65
		});
	
	/* Cufon Fonts
	 ------------------------------------------------------------------------*/
	Cufon.replace('h1, h2, h3, h4, h5, h6, #menu > li > a', {fontFamily: 'PT Sans Narrow', hover: 'true', textShadow: '#222 1px 1px'});

}) 


;(function ($) {



    jQuery.fn.Carousel = function(options) {
		
		return this.each(function() {		  
			var opts = jQuery.extend({
				'display_num' : 4,
				'element_height' : 65,
				'border' : 0
			}, options);
			   
			/* List variables */
			var container = $('ul', this),
				list_padding = $('li', this).css('padding-bottom').replace('px', ''),
				element_height = opts.element_height + 2*(parseInt(list_padding))+opts.border,
				list_height = opts.display_num * (element_height),
				element_num = $('li' ,this).size(),
				total = element_num - opts.display_num,
				current = 0;
			
			/* Bulid list */
			$('li' ,this).css('height', opts.element_height+'px');
			$('.dynamic-container', this).css('height', list_height+'px');
			
			/* Display navigation list */
			if (element_num > opts.display_num ) {
				
				/* Add navigation arrows */
				$(this).append('<div class="dynamic-nav"><a href="" class="nav-up"></a><a href="" class="nav-down"></a></div>');
				
				/* Bind click functions */
				$('a.nav-next', this).click(function () {
					if (current == total) current = total;
					else current++;
					container.animate({ top: (-current) * element_height }, { duration: 400, easing: 'easeOutQuart', queue: false });
					return false;
				});
				
				$('a.nav-prev', this).click(function () {
					if (current == 0) current = 0;
					else current--;
					container.animate({ top: (-current) * element_height }, { duration: 400, easing: 'easeOutQuart', queue: false });
					return false;
				});
			}
		})
    }

})(jQuery);


