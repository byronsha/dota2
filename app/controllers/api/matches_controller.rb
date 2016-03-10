class Api::MatchesController < ApplicationController
  def index
    match = Match

    if params[:filters]
      match = match.find_by_filters(params[:filters])
    end

    @matches = match.all.order('starts_at DESC').limit(25)
  end
end
