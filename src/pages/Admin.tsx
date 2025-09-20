import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Users, 
  FileQuestion, 
  BarChart3, 
  Settings,
  Search,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

const Admin = () => {
  const { user } = useAuth();
  const { addQuestion } = useQuiz();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: ""
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  // Mock data - this will come from Supabase later
  const stats = {
    totalUsers: 1247,
    totalQuizzes: 23,
    totalAttempts: 3890,
    avgScore: 78.5
  };

  const recentQuizzes = [
    { id: 1, title: "JavaScript Fundamentals", questions: 10, attempts: 156, avgScore: 82.3, status: "Published" },
    { id: 2, title: "React Hooks", questions: 8, attempts: 89, avgScore: 75.8, status: "Published" },
    { id: 3, title: "CSS Grid Layout", questions: 12, attempts: 203, avgScore: 88.1, status: "Draft" },
    { id: 4, title: "Node.js Basics", questions: 15, attempts: 67, avgScore: 71.2, status: "Published" }
  ];

  const recentUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", joinDate: "2024-01-15", quizzesTaken: 12, avgScore: 85.4 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", joinDate: "2024-01-20", quizzesTaken: 8, avgScore: 72.1 },
    { id: 3, name: "Carol Davis", email: "carol@example.com", joinDate: "2024-02-01", quizzesTaken: 15, avgScore: 91.3 },
    { id: 4, name: "David Wilson", email: "david@example.com", joinDate: "2024-02-05", quizzesTaken: 6, avgScore: 68.7 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your quiz platform, users, and analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
                </div>
                <FileQuestion className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quiz Attempts</p>
                  <p className="text-2xl font-bold">{stats.totalAttempts.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold">{stats.avgScore}%</p>
                </div>
                <Settings className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="quizzes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quizzes">Quiz Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Quiz Management */}
          <TabsContent value="quizzes">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Add New Question</CardTitle>
                      <CardDescription>Create and add questions to the quiz</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    addQuestion({
                      question: newQuestion.question,
                      options: [newQuestion.option1, newQuestion.option2, newQuestion.option3, newQuestion.option4],
                      answer: newQuestion.answer
                    });
                    setNewQuestion({
                      question: "",
                      option1: "",
                      option2: "",
                      option3: "",
                      option4: "",
                      answer: ""
                    });
                    alert("Question added successfully!");
                  }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question">Question</Label>
                      <Input
                        id="question"
                        placeholder="Enter your question"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="option1">Option 1</Label>
                        <Input
                          id="option1"
                          placeholder="First option"
                          value={newQuestion.option1}
                          onChange={(e) => setNewQuestion({...newQuestion, option1: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="option2">Option 2</Label>
                        <Input
                          id="option2"
                          placeholder="Second option"
                          value={newQuestion.option2}
                          onChange={(e) => setNewQuestion({...newQuestion, option2: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="option3">Option 3</Label>
                        <Input
                          id="option3"
                          placeholder="Third option"
                          value={newQuestion.option3}
                          onChange={(e) => setNewQuestion({...newQuestion, option3: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="option4">Option 4</Label>
                        <Input
                          id="option4"
                          placeholder="Fourth option"
                          value={newQuestion.option4}
                          onChange={(e) => setNewQuestion({...newQuestion, option4: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="answer">Correct Answer</Label>
                      <Input
                        id="answer"
                        placeholder="Enter the correct answer exactly as written in options"
                        value={newQuestion.answer}
                        onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Quiz Management</CardTitle>
                      <CardDescription>Manage your existing quizzes</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search quizzes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Quiz List */}
                    <div className="space-y-4">
                      {recentQuizzes.map((quiz) => (
                        <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold">{quiz.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {quiz.questions} questions • {quiz.attempts} attempts • {quiz.avgScore}% avg score
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={quiz.status === "Published" ? "default" : "secondary"}>
                              {quiz.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                    />
                  </div>

                  {/* User List */}
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.email} • Joined {user.joinDate}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.quizzesTaken} quizzes • {user.avgScore}% avg score
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>Comprehensive insights into platform usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics charts will be implemented with Supabase integration</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure your quiz platform preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="QuizMaster" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-quiz-time">Default Quiz Time (minutes)</Label>
                    <Input id="default-quiz-time" type="number" defaultValue="5" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passing-score">Default Passing Score (%)</Label>
                    <Input id="passing-score" type="number" defaultValue="70" />
                  </div>
                  
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;