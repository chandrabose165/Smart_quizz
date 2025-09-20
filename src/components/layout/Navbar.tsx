import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, Menu, User, X, Shield, LogOut } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              QuizMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/quiz" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/quiz') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Take Quiz
            </Link>
            <Link 
              to="/results" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/results') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Results
            </Link>
            {user?.role === "admin" && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive('/') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/quiz"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive('/quiz') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Take Quiz
              </Link>
              <Link
                to="/results"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive('/results') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Results
              </Link>
              <Link
                to="/admin"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive('/admin') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </div>
              </Link>
              <div className="pt-4 border-t space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;