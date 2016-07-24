app.config(function($provide) {
    $provide.decorator("$exceptionHandler", ['$delegate', function($delegate) {
        return function(exception, cause) {
            $delegate(exception, cause);
            debugger
            alert(exception.message);
        };
    }]);
});