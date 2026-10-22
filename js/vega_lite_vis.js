var top15Spec = "js/top25_activities_participated.json";
var ageSkewedSpec = "js/age_skewed.json";
var whoorganised = "js/who_organises_activities.json";
var technologySpec = "js/technology_gadgets.json";
var motivationAgeGenderSpec = "js/motivation_age_gender.json";
var barriersAgeGenderSpec = "js/barriers_age_gender.json";
var activeTrendSpec = "js/active_trend.json";
var activityParticipationTrendSpec = "js/activity_participation_trend.json";
var stateParticipationSpec = "js/state_participation.json";
var stateActivitySpec = "js/state_activity.json";
var stateActivityTreemapSpec = "js/state_activity_treemap.json";
var stateGenderGapSpec = "js/state_gender_gap.json";
var activeVsHealthSpec = "js/active_vs_health.json";
var socioeconomicFactorsSpec = "js/socioeconomic_factors.json";

function embedChart(selector, spec, opts) {
    var options = Object.assign({ actions: false, renderer: 'svg' }, opts);

    return vegaEmbed(selector, spec, options).then(function (res) {
        var svg = res.view.container().querySelector('svg');

        if (svg) {
            var syncViewBox = function () {
                var w = svg.getAttribute('width');
                var h = svg.getAttribute('height');
                if (w && h) {
                    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
                }
            };

            syncViewBox();

            new MutationObserver(syncViewBox).observe(svg, {
                attributes: true,
                attributeFilter: ['width', 'height']
            });
        }

        return res;
    });
}

embedChart('#top15_activities_chart', top15Spec)
    .catch(console.error);

embedChart('#age_skewed_chart', ageSkewedSpec)
    .catch(console.error);

embedChart('#who_organised_chart', whoorganised)
    .catch(console.error);

embedChart('#technology_gadgets_chart', technologySpec)
    .catch(console.error);

embedChart('#motivation_age_gender_chart', motivationAgeGenderSpec)
    .catch(console.error);

embedChart('#barriers_age_gender_chart', barriersAgeGenderSpec)
    .catch(console.error);

embedChart('#active_trend_chart', activeTrendSpec)
    .catch(console.error);

embedChart('#activity_participation_trend_chart', activityParticipationTrendSpec)
    .catch(console.error);

embedChart('#state_participation_chart', stateParticipationSpec)
    .catch(console.error);

// The treemap is its own chart, so pass the state clicked on the radial chart's map across to it.
Promise.all([
    embedChart('#state_activity_chart', stateActivitySpec),
    embedChart('#state_activity_treemap_chart', stateActivityTreemapSpec)
])
    .then(function (results) {
        var radialView = results[0].view;
        var treemapView = results[1].view;
        radialView.addSignalListener('stateSel', function (name, value) {
            var state = value && value.state_name ? [].concat(value.state_name)[0] : null;
            if (state) {
                treemapView.signal('selState', state).runAsync();
            }
        });
    })
    .catch(console.error);

embedChart('#state_gender_gap_chart', stateGenderGapSpec)
    .catch(console.error);

embedChart('#active_vs_health_chart', activeVsHealthSpec)
    .catch(console.error);

/* ---------- Socioeconomic factors ----------
   One small lollipop chart per factor, so each can sit beside its matching insight. */
var socioeconomicFactorCharts = [
    { el: '#socio_income_chart', factor: 'Annual household income' },
    { el: '#socio_education_chart', factor: 'Highest education completed' },
    { el: '#socio_employment_chart', factor: 'Employment status' },
    { el: '#socio_remoteness_chart', factor: 'Remoteness' },
    { el: '#socio_household_chart', factor: 'Household structure' }
];

fetch(socioeconomicFactorsSpec)
    .then(function (response) { return response.json(); })
    .then(function (template) {
        socioeconomicFactorCharts.forEach(function (chart, i) {
            var spec = JSON.parse(JSON.stringify(template));
            spec.transform.unshift({ filter: "datum.factor === '" + chart.factor + "'" });
            if (i === socioeconomicFactorCharts.length - 1) {
                spec.encoding.x.title = 'Difference from national weekly participation rate (percentage points)';
            }
            embedChart(chart.el, spec)
                .catch(console.error);
        });
    })
    .catch(console.error);