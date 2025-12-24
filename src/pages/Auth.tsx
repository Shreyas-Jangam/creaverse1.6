import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft,
  Clock,
  Bell,
  Users
} from "lucide-react";
import creaverseLogo from "@/assets/creaverse-logo.png";

export default function Auth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center justify-center gap-4 mb-8 group">
          <div className="relative">
            <img 
              src={creaverseLogo} 
              alt="CreaverseDAO" 
              className="w-24 h-24 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              CreaverseDAO
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Create And Govern</p>
          </div>
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>
            </div>
            <CardTitle className="text-2xl">Authentication Coming Soon</CardTitle>
            <CardDescription className="text-base">
              We're putting the finishing touches on our secure authentication system. 
              Sign-in and user accounts will be available very soon!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features Coming Soon */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center text-foreground">What's Coming:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
                  <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">User Accounts</p>
                    <p className="text-xs text-muted-foreground">Create your profile and join the community</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Content Creation</p>
                    <p className="text-xs text-muted-foreground">Share your creative work with the world</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/20">
                  <Bell className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">DAO Participation</p>
                    <p className="text-xs text-muted-foreground">Vote on proposals and shape the future</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-400/20">
              <p className="text-sm text-muted-foreground mb-2">In the meantime, explore as a guest:</p>
              <Link to="/feed">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500">
                  Browse Content
                </Button>
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center pt-4 border-t border-border/50">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span>Development in Progress</span>
        </div>
      </motion.div>
    </div>
  );
}
