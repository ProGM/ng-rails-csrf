angular.module('ng-rails-csrf', [] ).config(['$httpProvider', function($httpProvider) {
    var getToken = function() {
        // Rails 3+
        var el = document.querySelector('meta[name="csrf-token"]');
        if (el) {
            el = el.getAttribute('content');
        } else {
            // Rails 2
            el = document.querySelector('input[name="authenticity_token"]');
            if (el) {
                el = el.value;
            }
        }
        return el;
    };
    var updateToken = function() {
        var headers = $httpProvider.defaults.headers, token = getToken();
        if (token) {
            var methods = ['get', 'post', 'put'];
            for (var i = 0; i < methods.size; i++)
            {
                headers[methods[i]]['X-CSRF-TOKEN'] = getToken;
                headers[methods[i]]['X-Requested-With'] = 'XMLHttpRequest';
            }
        }
    };
    updateToken();
    if (window['Turbolinks']) {
      document.addEventListener('page:change', updateToken);
    }
}]);
