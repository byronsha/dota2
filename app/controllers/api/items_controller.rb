class Api::ItemsController < ApplicationController
  def index
    @items = Item.all
  end
end
