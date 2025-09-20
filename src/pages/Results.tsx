import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, CheckCircle, XCircle, Target, Repeat, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Results = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { answers, quiz, timeSpent } = location.state || {};

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <CardTitle className="text-2xl">No Results Available</CardTitle>
              <CardDescription>
                Results are only available for administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-6 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <span>Access restricted to admin users only</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button size="lg" className="w-full sm:w-auto">
                    Take Quiz
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Mock data if no state is passed
  const mockData = {
    answers: ["0", "1", "2"],
    quiz: {
      title: "JavaScript Fundamentals",
      questions: [
        { correctAnswer: 0 },
        { correctAnswer: 1 },
        { correctAnswer: 2 }
      ]
    },
    timeSpent: 180
  };

  const data = location.state ? { answers, quiz, timeSpent } : mockData;
  
  // Calculate results
  const totalQuestions = data.quiz.questions.length;
  const correctAnswers = data.answers.filter((answer: string, index: number) => 
    parseInt(answer) === data.quiz.questions[index].correctAnswer
  ).length;
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const timeMinutes = Math.floor(data.timeSpent / 60);
  const timeSeconds = data.timeSpent % 60;

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "bg-success", emoji: "🏆" };
    if (score >= 80) return { level: "Very Good", color: "bg-primary", emoji: "🌟" };
    if (score >= 70) return { level: "Good", color: "bg-warning", emoji: "👍" };
    if (score >= 60) return { level: "Fair", color: "bg-muted", emoji: "📚" };
    return { level: "Needs Improvement", color: "bg-destructive", emoji: "💪" };
  };

  const performance = getPerformanceLevel(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{performance.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-xl text-muted-foreground">
            Here's how you performed on "{data.quiz.title}"
          </p>
        </div>

        {/* Score Overview */}
        <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Score</CardTitle>
            <CardDescription>Overall performance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Score Circle */}
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                      className="text-primary transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">{score}%</span>
                    <span className="text-sm text-muted-foreground">Score</span>
                  </div>
                </div>
                <Badge className={`${performance.color} text-white`}>
                  {performance.level}
                </Badge>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Correct Answers</span>
                  </div>
                  <span className="font-bold">{correctAnswers}/{totalQuestions}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span>Incorrect Answers</span>
                  </div>
                  <span className="font-bold">{totalQuestions - correctAnswers}/{totalQuestions}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>Time Taken</span>
                  </div>
                  <span className="font-bold">{timeMinutes}m {timeSeconds}s</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Accuracy</span>
                  </div>
                  <span className="font-bold">{score}%</span>
                </div>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Questions Answered</span>
                    <span>{totalQuestions}/{totalQuestions}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy Rate</span>
                    <span>{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Performance Level</span>
                    <span>{performance.level}</span>
                  </div>
                  <Progress 
                    value={score} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Breakdown */}
        <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Question Breakdown</CardTitle>
            <CardDescription>Review your answers for each question</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.quiz.questions.map((question: any, index: number) => {
                const userAnswer = parseInt(data.answers[index]);
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${isCorrect ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}
                      `}>
                        {index + 1}
                      </div>
                      <span className="font-medium">Question {index + 1}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <span className={`font-medium ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/quiz">
            <Button size="lg" className="w-full sm:w-auto">
              <Repeat className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Trophy className="h-4 w-4 mr-2" />
            View All Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;