class Api::HeroesController < ApplicationController
  def index
    @heroes = Hero.all.order('name')
  end
end
