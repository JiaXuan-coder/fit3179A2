var top15Spec = "js/top15_activities_participated.json";
var ageSkewedSpec = "js/age_skewed.json";
var whoorganised = "js/who_organises_activities.json";
var technologySpec = "js/technology_gadgets.json";

vegaEmbed('#top15_activities_chart', top15Spec, { actions: false })
    .catch(console.error);

vegaEmbed('#age_skewed_chart', ageSkewedSpec, { actions: false })
    .catch(console.error);

vegaEmbed('#who_organised_chart', whoorganised, { actions: false })
    .catch(console.error);

vegaEmbed('#technology_gadgets_chart', technologySpec, { actions: false })
    .catch(console.error);