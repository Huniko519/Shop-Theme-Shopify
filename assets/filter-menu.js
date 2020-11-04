function deferFilterjQuery() {
    if (window.jQuery) {
        $(function(){
          // On load/reload
          var pt_on_load = function() {
            // Accordion
            

          	// Search
            $('.pt-display-search').not('.has_group_selected').find('input.fm-search-box').show();

          	// Drop downs
            $('.pt-display-dropdown').each(function( index ) {
                $(this).find('h4').after($(this).find('.filter-clear'));
            });

            $('.pt-display-dropdown .scroll-content').each(function( index ) {
                if($(this).find('li.selected').length) {
                    var selected = $.map(
                        $(this).find('li.selected a'),
                            function(element){
                                return $(element).text();
                            }
                      ).join(", ");

                  if (selected.length < 30) {
                    $(this).before('<div class="menu-trigger">' + selected +'</div>');
                  } else {
                     $(this).before('<div class="menu-trigger">' + $(this).find('li.selected').length + ' Selected </div>');
                  }
                }
                else {
                    $(this).before('<div class="menu-trigger">'+ $(this).closest('.filter-group').find('h4').text() +'</div>');
                }
            });

          	// View more
            
          }

          pt_on_load();

          // Mobile filter button
          
          $(document).on('click', '.filter-menu .pt-mobile-header a', function(e){
            if(e.handled !== true) {
              if ($('.pt-nav-toggle').hasClass('active')) {
                $('.filter-menu').removeClass('pt-expand');
              } else {
                $('.filter-menu').addClass('pt-expand');
              }

              $('.pt-nav-toggle').toggleClass('active');
              e.preventDefault();
              e.handled = true;
            }
          });

          

          // Accordion
          

          // Search
          $(document).on('keyup', '.filter-group input.fm-search-box', function () {
            var value = this.value.toLowerCase();
            $(this).closest('.filter-group').find('li').each(function () {
              if ($(this).text().toLowerCase().search(value) > -1) {
                $(this).show(100);
              } else {
                $(this).hide(100);
              }
            });
          });

          // Drop downs
          $(document).on('click','.pt-display-dropdown .menu-trigger',function() {
            $(this).next('.scroll-content').css('top', $(this).position().top + $(this).height() + 1).css('left', $(this).position().left);
            $(this).next('.scroll-content').slideToggle('fast');
          });

          $(document).on('mouseleave', '.pt-display-dropdown .scroll-content', function() {
            $(this).slideUp('fast');
          });

          // Apply button
          

          // Ajax
          
      });
    }
    else {
        setTimeout(function() { deferFilterjQuery() }, 50);
    }
}

deferFilterjQuery();
