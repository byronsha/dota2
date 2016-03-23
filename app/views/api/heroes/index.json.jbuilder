json.array! @heroes do |hero|
  json.id hero.id
  json.name hero.name
  json.image_url hero.image_url
end
