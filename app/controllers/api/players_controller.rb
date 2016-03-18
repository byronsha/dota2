class Api::PlayersController < ApplicationController
  def index
    @players = Player.all.limit(100)
  end
end
