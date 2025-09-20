import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Trophy, BarChart } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Smart Quiz Engine",
      description: "Advanced question randomization and difficulty progression for optimal learning"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Multi-User Support",
      description: "Seamless experience for students, teachers, and administrators"
    },
    {
      icon: <Trophy className="h-8 w-8 text-warning" />,
      title: "Achievement System",
      description: "Track progress with badges, scores, and detailed performance analytics"
    },
    {
      icon: <BarChart className="h-8 w-8 text-success" />,
      title: "Real-time Analytics",
      description: "Comprehensive insights into quiz performance and learning trends"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                Master Knowledge
              </span>
              <br />
              <span className="text-foreground">Through Interactive Quizzes</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform learning into an engaging experience with our advanced quiz platform. 
              Create, take, and analyze quizzes with powerful insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Try Demo Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose QuizMaster?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built for educators, students, and knowledge enthusiasts who demand the best learning experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of educators and students already using QuizMaster to enhance their learning experience
            </p>
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;