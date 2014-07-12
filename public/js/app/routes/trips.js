'use strict';

mrm.config(function ($routeProvider) {

  $routeProvider.when('/passeios', {

    templateUrl: 'templates/trips.html',

    // that's I prefer backbone for dynaminc dom rendering
    onRender: function() {
      setTimeout(function() {

        $(':checkbox').checkbox();

        $('ul.nav-pills li a').click(function (e) {
          $('ul.nav-pills li.active').removeClass('active');
          $(this).parent('li').addClass('active');
        });

        $('.nav-tabs').click(function (e) {
          e.preventDefault();
          $(this).tab('show');
        });

        $('[data-toggle="tooltip"]').tooltip();

      }, 30);
    }
  });

});
