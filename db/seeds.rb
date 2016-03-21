class Seed
  def self.start
    new.generate
  end

  def generate
    create_ideas
  end

  def create_ideas
    Idea.create(title: "Drink Beer",
                body:  "I think that in order to finish this project, I need " \
                       "to drink at least 2 IPAs per day or else I will fail",
                quality: "genius")
    Idea.create(title: "Finish This Project",
                body:  "Complete this project on time by Thursday morning")
  end
end

Seed.start
