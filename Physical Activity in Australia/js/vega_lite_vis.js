var top15Spec = "js/top15_activities_participated.json";
var ageSkewedSpec = "js/age_skewed.json";

vegaEmbed('#top15_activities_chart', top15Spec)
    .catch(console.error);

vegaEmbed('#age_skewed_chart', ageSkewedSpec)
    .catch(console.error);