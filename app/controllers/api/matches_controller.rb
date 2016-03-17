class Api::MatchesController < ApplicationController
  def index
    match = Match

    p '~~~~~~'
    p JSON.parse(params[:filters])

    if params[:filters]
      match = match.find_by_filters(JSON.parse(params[:filters]))
    end

    @matches = match.all.order('starts_at DESC').limit(25)
  end
end
