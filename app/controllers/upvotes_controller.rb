class UpvotesController < ApplicationController

  def index
    render json: Upvote.where(user_id: current_user.id)
  end
end