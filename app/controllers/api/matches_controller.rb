class Api::MatchesController < ApplicationController
  def index
    match = Match

    if params[:filters]
      match = match.find_by_filters(JSON.parse(params[:filters]))
    end

    @matches = match.all.includes(players: :items).order('starts_at DESC').limit(25)
  end

  def show
    @match = Match.find(params[:id])
  end
end
