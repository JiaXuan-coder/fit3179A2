var top15Spec = "js/top15_activities_participated.json";
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

vegaEmbed('#top15_activities_chart', top15Spec, { actions: false })
    .catch(console.error);

vegaEmbed('#age_skewed_chart', ageSkewedSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#who_organised_chart', whoorganised, { actions: false })
    .catch(console.error);

vegaEmbed('#technology_gadgets_chart', technologySpec, { actions: false })
    .catch(console.error);

vegaEmbed('#motivation_age_gender_chart', motivationAgeGenderSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#barriers_age_gender_chart', barriersAgeGenderSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#active_trend_chart', activeTrendSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#activity_participation_trend_chart', activityParticipationTrendSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#state_participation_chart', stateParticipationSpec, { actions: false })
    .catch(console.error);

// SVG renderer so hover/click hit areas stay aligned when CSS scales the chart down.
// The treemap is its own chart, so pass the state clicked on the radial chart's map across to it.
Promise.all([
    vegaEmbed('#state_activity_chart', stateActivitySpec, { actions: false, renderer: 'svg' }),
    vegaEmbed('#state_activity_treemap_chart', stateActivityTreemapSpec, { actions: false, renderer: 'svg' })
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

vegaEmbed('#state_gender_gap_chart', stateGenderGapSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#active_vs_health_chart', activeVsHealthSpec, { actions: false })
    .catch(console.error);

// One small lollipop chart per factor, so each can sit beside its matching insight
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
            vegaEmbed(chart.el, spec, { actions: false })
                .catch(console.error);
        });
    })
    .catch(console.error);
