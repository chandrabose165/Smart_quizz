import { useAuth } from "@/contexts/AuthContext";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Quiz = () => {
  const { user } = useAuth();
  const { questions, currentQuestion, score, finished, answerQuestion, resetQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (option: string) => {
    answerQuestion(option);
  };

  if (finished) {
    navigate("/results");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Quiz Time!</h1>
              <p className="text-muted-foreground">Answer all questions to complete the quiz</p>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">5:00</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">
                  {currentQ.question}
                </CardTitle>
                <CardDescription>
                  Select the best answer from the options below
                </CardDescription>
              </div>
              <div className="ml-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                #{currentQuestion + 1}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="flex-1 text-sm leading-relaxed">{option}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigator */}
        <Card className="mt-6 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center
                    ${index === currentQuestion 
                      ? 'bg-primary text-primary-foreground' 
                      : index < currentQuestion
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted'
                    }
                  `}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;