class Api::HeroesController < ApplicationController
  def index
    @heroes = Hero.all.order('name')
  end

  def show
    @hero = Hero.find(params[:id])
  end
end
