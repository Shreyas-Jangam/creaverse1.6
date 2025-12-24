import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Code2, 
  Github, 
  Star, 
  Eye, 
  MessageSquare, 
  Upload,
  GitBranch,
  Users,
  Calendar,
  ExternalLink
} from "lucide-react";
import { AppLayout } from "@/components/layout";

// Mock tech project data
const techProjects = [
  {
    id: 1,
    title: "DeFi Analytics Dashboard",
    developer: "CryptoBuilder",
    description: "Real-time analytics for DeFi protocols with advanced charting and portfolio tracking.",
    language: "TypeScript",
    stars: 234,
    forks: 45,
    lastUpdate: "2 days ago",
    status: "Active",
    tags: ["DeFi", "Analytics", "React"]
  },
  {
    id: 2,
    title: "NFT Marketplace SDK",
    developer: "Web3DevCo",
    description: "Complete SDK for building NFT marketplaces with smart contract integration.",
    language: "Solidity",
    stars: 189,
    forks: 67,
    lastUpdate: "1 week ago",
    status: "Beta",
    tags: ["NFT", "SDK", "Smart Contracts"]
  },
  {
    id: 3,
    title: "DAO Governance Tools",
    developer: "DecentralizedDev",
    description: "Comprehensive toolkit for creating and managing DAO governance systems.",
    language: "JavaScript",
    stars: 156,
    forks: 23,
    lastUpdate: "3 days ago",
    status: "Active",
    tags: ["DAO", "Governance", "Tools"]
  },
  {
    id: 4,
    title: "Cross-Chain Bridge UI",
    developer: "BridgeBuilder",
    description: "User-friendly interface for cross-chain asset transfers with security features.",
    language: "Vue.js",
    stars: 98,
    forks: 34,
    lastUpdate: "5 days ago",
    status: "Active",
    tags: ["Cross-Chain", "Bridge", "UI"]
  },
  {
    id: 5,
    title: "Smart Contract Auditor",
    developer: "SecurityFirst",
    description: "Automated smart contract vulnerability detection and security analysis tool.",
    language: "Python",
    stars: 312,
    forks: 78,
    lastUpdate: "1 day ago",
    status: "Active",
    tags: ["Security", "Audit", "Smart Contracts"]
  }
];

export default function Tech() {
  const [selectedProject, setSelectedProject] = useState<typeof techProjects[0] | null>(null);
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature coming soon with Web3 integration.`,
      duration: 3000,
    });
  };

  const handleViewDetails = (project: typeof techProjects[0]) => {
    setSelectedProject(project);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton fallbackPath="/explore" />
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              💻 Open-Source Tech Hub
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Developers publish open-source tools. Users review and rate quality.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500"
            onClick={() => showComingSoon("Publish Tool")}
          >
            <Upload className="w-5 h-5 mr-2" />
            Publish Tool (Coming Soon)
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => showComingSoon("Connect Repo")}
          >
            <Github className="w-5 h-5 mr-2" />
            Connect Repo (Coming Soon)
          </Button>
        </div>

        {/* Tech Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-blue-500/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="w-4 h-4" />
                      <span>{project.developer}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    Web3 Feature Coming Soon
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.lastUpdate}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewDetails(project)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showComingSoon("Rate Project")}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Rate (Coming Soon)
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showComingSoon("Leave Review")}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Review (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Details Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-400">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                {/* Developer Info */}
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-semibold">{selectedProject.developer}</p>
                    <p className="text-sm text-muted-foreground">Project Developer</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Technical Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Language</h4>
                    <Badge variant="outline">{selectedProject.language}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Status</h4>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                      {selectedProject.status}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{selectedProject.stars}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Stars</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <GitBranch className="w-4 h-4" />
                      <span className="font-semibold">{selectedProject.forks}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Forks</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold text-xs">{selectedProject.lastUpdate}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Updated</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                    onClick={() => showComingSoon("View Repository")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Repository (Coming Soon)
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Rate Project")}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Rate Project (Coming Soon)
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Leave Review")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Leave Review (Coming Soon)
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}