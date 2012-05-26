---
---
{% include js/jquery.min.js %}
{% include js/jquery.roundabout.min.js %}
{% include js/underscore-min.js %}
{% include js/backbone-min.js %}
{% include js/bootstrap.min.js %}

$(document).ready(function() {
    $('ul.roundabout').roundabout({
        maxScale: 0.5,
        autoplay: true,
        autoplayDuration: 1500,
        autoplayInitialDelay: 500
    });
});
