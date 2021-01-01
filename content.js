// duproprio
$(".search-results-listings-list__item-bottom-container").each(function(i, obj) {
  var price = $(this).find(".search-results-listings-list__item-description__price").text().replace(/\D/g,'')
  var sanitized_price = parseInt(price)
  var surface = $(this).find(".search-results-listings-list__item-description__characteristics--long-numbers:first").text().replace(/\D/g,'')
  var sanitizedSurface = parseInt(surface)

  var price_per_surface = (sanitized_price / sanitizedSurface).toFixed(2);
  var element = $(this).find(".search-results-listings-list__item-description__characteristics__item:last")

  if(!isNaN(price_per_surface)) {
    $(`<div class="search-results-listings-list__item-description__characteristics__item" style="padding:5px;border-radius:5px;background-color:#ff4646;color:white;"><span style="font-weight:initial;height:15px;margin-right:3px;">$ </span><p> ${price_per_surface}/pi²</p></div>`).insertAfter(element)
  }
})

// show duproprio
var price = $(".listing-price__amount:first").text().replace(/[^0-9]/g, '')
var sanitized_price = parseInt(price)
var surface = $(".listing-main-characteristics__number.listing-main-characteristics__number--dimensions").text().replace(/\s/g, "");
var regex = /([^-]*)²/
var sanitizedSurface = parseInt(regex.exec(surface)[0])
var price_per_surface = (sanitized_price / sanitizedSurface).toFixed(2);

if(!isNaN(price_per_surface)) {
  $(`<div class="search-results-listings-list__item-description__characteristics__item" style="padding: 5px;border-radius: 5px;background-color: #ff4646;color: white;font-size: 12px;margin: 0;display: flex;justify-content: center;align-items: center;"><span style="font-weight:initial;height:15px;margin-right:3px;">$ </span><p> ${price_per_surface}/pi²</p></div>`).insertAfter($(".listing-price__amount:last"))
}

// centris
var price = $("#BuyPrice").text().replace(/[^0-9]/g, '')
var sanitized_price = parseInt(price)

$(".carac-container").each(function(i, obj) {
  const words = ["Superficie nette", "Superficie brute", "Net area", "Brut area"]
  var isSurface = words.includes($(this).find(".carac-title").text())
  if(isSurface) {
    var surface = $(this).find(".carac-value").text().replace(/\D/g,'')
    var sanitizedSurface = parseInt(surface)
    var price_per_surface = (sanitized_price / sanitizedSurface).toFixed(2);

    if(!isNaN(price_per_surface)) {
      $(`<div class="col-lg-3 col-sm-6 carac-container"><div class="carac-title">Prix par pied</div><div class="carac-value"><span style="padding:5px;border-radius:5px;background-color:#ff4646;color:white;">$ ${price_per_surface}/pi²</span></div></div>`).insertAfter(this)
    }
  }
})
