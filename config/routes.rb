Rails.application.routes.draw do
  root to: "ideas#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "/ideas", to: "ideas#index"
    end
  end
end
