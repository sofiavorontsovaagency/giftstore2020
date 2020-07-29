function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


(function($) {

  var pageID = $("#page").data("lp");
  if(!pageID) {
    pageID = false;
  }

  var starID = $("#page").data("starid");
  if(!starID) {
    starID = false;
  }

  var abIDfromWebsite = $("#getABidHere").data("ab");
  if(!abIDfromWebsite) {
    abIDfromWebsite = false;
  }

  var tableIDfromWebsite = $("#getABidHere").data("tableid");
  if(!tableIDfromWebsite) {
    tableIDfromWebsite = false;
  }

  var device = getQueryVariable('device');
  var utm_source = getQueryVariable('utm_source');
  var utm_medium = getQueryVariable('utm_medium');
  var utm_term = getQueryVariable('utm_term');
  var utm_content = getQueryVariable('utm_content');
  var utm_campaign = getQueryVariable('utm_campaign');
  var gclid = getQueryVariable('gclid');
  var keyword = getQueryVariable('keyword');
  var matchtype = getQueryVariable('matchtype');
  var adpos = getQueryVariable('adpos');

  $(".js-claim").click(function(e){
    // e.preventDefault();
    aggpos = $(this).parents(".clickable-row").data("aggpos");
    if(!aggpos) {
      aggpos = $(this).data("pos");
    }
    if(!aggpos) {
      aggpos = false;
    }
    brandID = $(this).data("brand");
    if(!brandID) {
      brandID = $(this).parents(".clickable-row").data("brand");
    }

    aggtableID = $(this).parents(".table").data("tableid");
    abID = $(this).parents(".table").data("ab");

    clickout(aggpos, brandID);

    if(typeof mktag !== 'undefined') {
      mktag.event("Clickout", {
          brand_id: brandID,
          star_id: starID,
      });
      console.log('a24');
    }
  });

  function clickout(aggpos, brandID) {

    $.ajax({
        type: 'POST',
        url: ajax_o.ajax_url,
        data: {
          action: 'store_user_info',
          pageID: pageID,
          starID: starID,
          aggpos: aggpos,
          brandID: brandID,
          device: device,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_term: utm_term,
          utm_content: utm_content,
          utm_campaign: utm_campaign,
          gclid: gclid,
          keyword: keyword,
          matchtype: matchtype,
          adpos: adpos,
          aggtableID: aggtableID,
          abID: abID,
        },
        success: function(result) {

          console.log(result);

        }
    });

  }


  $( document ).ready(function() {
    visit();
  });

  function visit() {

    $.ajax({
      type: 'POST',
      url: ajax_o.ajax_url,
      data: {
        action: 'store_visit_info',
        pageID: pageID,
        starID: starID,
        device: device,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_term: utm_term,
        utm_content: utm_content,
        utm_campaign: utm_campaign,
        gclid: gclid,
        keyword: keyword,
        matchtype: matchtype,
        adpos: adpos,
        abID: abIDfromWebsite,
        aggtableID: tableIDfromWebsite,
      },
      success: function(result) {
        console.log(result);
      }
    });

  }

})(jQuery);
