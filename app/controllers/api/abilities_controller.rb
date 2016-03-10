class Api::AbilitiesController < ApplicationController
  def index
    @abilities = Ability.all
  end
end
