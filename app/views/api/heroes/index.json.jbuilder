json.array! @heroes do |hero|
  json.id hero.id
  json.name hero.name
  json.image_url hero.image_url

  json.abilities hero.abilities do |ability|
    json.id ability.id
    json.name ability.name
    json.image_url ability.image_url
  end
end
