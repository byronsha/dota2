class Api::PlayersController < ApplicationController
  def index
    @players = Player.all.order('id DESC').limit(100)
  end
end
