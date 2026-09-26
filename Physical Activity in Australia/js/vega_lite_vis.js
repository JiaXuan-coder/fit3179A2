var top15Spec = "js/top15_activities_participated.json";
var ageSkewedSpec = "js/age_skewed.json";
var whoorganised = "js/who_organises_activities.json";
var technologySpec = "js/technology_gadgets.json";
var motivationAgeGenderSpec = "js/motivation_age_gender.json";
var barriersAgeGenderSpec = "js/barriers_age_gender.json";
var activeTrendSpec = "js/active_trend.json";
var activityParticipationTrendSpec = "js/activity_participation_trend.json";

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