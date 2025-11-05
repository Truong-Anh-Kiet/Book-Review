import { Button } from "@/components/ui/button";
import { BookOpen, User, LogOut } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
}

export default function Header({
  isLoggedIn,
  username,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold" data-testid="text-app-title">
              BookReview
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium" data-testid="text-current-user">
                    {username}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={onLogoutClick}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onLoginClick} data-testid="button-login">
                  Login
                </Button>
                <Button onClick={onRegisterClick} data-testid="button-register">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
