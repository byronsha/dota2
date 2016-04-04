json.id @match.id

json.players @match.players do |player|
  json.id player.id

  json.items player.items do |item|
    json.id item.id
    json.name item.name
    json.image_url item.image_url
  end

  # if player.units
  #   json.units player.units do |unit|
  #     json.name unit.name
  #
  #     json.items unit.items do |item|
  #       json.id item.id
  #       json.name item.name
  #       json.image_url item.image_url
  #     end
  #   end
  # end
end
