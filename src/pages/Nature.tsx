import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, 
  MapPin, 
  TreePine, 
  Droplets, 
  Wind,
  Upload,
  Heart,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { AppLayout } from "@/components/layout";

// Mock nature project data
const natureProjects = [
  {
    id: 1,
    name: "Amazon Rainforest Restoration",
    location: "Brazil, Amazon Basin",
    impact: "Restore 10,000 hectares of degraded rainforest",
    status: "In-Progress",
    description: "Large-scale reforestation project focusing on native species restoration and biodiversity conservation in the Amazon rainforest.",
    fundingGoal: "$2.5M",
    currentFunding: "$1.8M",
    contributors: 1247,
    startDate: "Jan 2024",
    expectedCompletion: "Dec 2026",
    category: "Reforestation",
    verificationScore: 95
  },
  {
    id: 2,
    name: "Ocean Plastic Cleanup Initiative",
    location: "Pacific Ocean, Great Pacific Garbage Patch",
    impact: "Remove 50 tons of plastic waste from ocean",
    status: "Proposed",
    description: "Innovative ocean cleanup technology deployment to remove plastic waste and microplastics from marine environments.",
    fundingGoal: "$1.2M",
    currentFunding: "$0.3M",
    contributors: 523,
    startDate: "Mar 2024",
    expectedCompletion: "Sep 2025",
    category: "Ocean Conservation",
    verificationScore: 88
  },
  {
    id: 3,
    name: "Solar-Powered Water Wells",
    location: "Kenya, Turkana County",
    impact: "Provide clean water access to 5,000 people",
    status: "Completed",
    description: "Installation of solar-powered water pumping systems in remote communities to ensure sustainable access to clean water.",
    fundingGoal: "$800K",
    currentFunding: "$800K",
    contributors: 892,
    startDate: "Jun 2023",
    expectedCompletion: "Dec 2023",
    category: "Water Access",
    verificationScore: 98
  },
  {
    id: 4,
    name: "Urban Bee Sanctuary Network",
    location: "Multiple Cities, Global",
    impact: "Create 100 urban bee sanctuaries worldwide",
    status: "In-Progress",
    description: "Establishing bee-friendly habitats in urban environments to support pollinator populations and urban biodiversity.",
    fundingGoal: "$500K",
    currentFunding: "$320K",
    contributors: 678,
    startDate: "Apr 2024",
    expectedCompletion: "Apr 2025",
    category: "Biodiversity",
    verificationScore: 92
  },
  {
    id: 5,
    name: "Mangrove Restoration Project",
    location: "Philippines, Palawan",
    impact: "Plant 50,000 mangrove trees for coastal protection",
    status: "Proposed",
    description: "Coastal restoration project to plant mangrove forests for storm protection and marine ecosystem restoration.",
    fundingGoal: "$600K",
    currentFunding: "$150K",
    contributors: 234,
    startDate: "May 2024",
    expectedCompletion: "Nov 2025",
    category: "Coastal Protection",
    verificationScore: 85
  }
];

export default function Nature() {
  const [selectedProject, setSelectedProject] = useState<typeof natureProjects[0] | null>(null);
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} feature launching soon.`,
      duration: 3000,
    });
  };

  const handleViewProject = (project: typeof natureProjects[0]) => {
    setSelectedProject(project);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "In-Progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "Proposed":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "In-Progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Proposed":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Reforestation":
        return <TreePine className="w-4 h-4 text-green-500" />;
      case "Ocean Conservation":
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case "Water Access":
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case "Biodiversity":
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      case "Coastal Protection":
        return <Wind className="w-4 h-4 text-teal-500" />;
      default:
        return <Leaf className="w-4 h-4 text-green-500" />;
    }
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
            <Leaf className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              🌿 Tokenized Nature Conservation
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Environmental projects tokenized. Reviewers verify results and earn rewards.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500"
            onClick={() => showComingSoon("Submit Environmental Project")}
          >
            <Upload className="w-5 h-5 mr-2" />
            Submit Environmental Project (Coming Soon)
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => showComingSoon("Support / Donate")}
          >
            <Heart className="w-5 h-5 mr-2" />
            Support / Donate (Coming Soon)
          </Button>
        </div>

        {/* Nature Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {natureProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-green-500/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(project.status)}
                      <span className="text-xs">{project.status}</span>
                    </div>
                  </Badge>
                </div>
                
                <CardTitle className="text-lg font-semibold mb-2 group-hover:text-green-400 transition-colors">
                  {project.name}
                </CardTitle>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                  <p className="text-sm font-medium text-green-400 mb-1">Impact Goal</p>
                  <p className="text-sm text-muted-foreground">{project.impact}</p>
                </div>

                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 w-full justify-center">
                  Web3 Impact Feature Coming Soon
                </Badge>

                {/* Funding Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-medium">{project.currentFunding} / {project.fundingGoal}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(parseFloat(project.currentFunding.replace(/[$MK,]/g, '')) / parseFloat(project.fundingGoal.replace(/[$MK,]/g, ''))) * 100}%` 
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{project.contributors} contributors</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewProject(project)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showComingSoon("Verify Impact")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verify (Coming Soon)
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => showComingSoon("Support Project")}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Support (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Details Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-green-400 flex items-center gap-2">
                {selectedProject && getCategoryIcon(selectedProject.category)}
                {selectedProject?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedProject && (
              <div className="space-y-6">
                {/* Status and Location */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg flex-1">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-semibold">{selectedProject.location}</p>
                      <p className="text-sm text-muted-foreground">Project Location</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    {getStatusIcon(selectedProject.status)}
                    <div>
                      <p className="font-semibold">{selectedProject.status}</p>
                      <p className="text-sm text-muted-foreground">Current Status</p>
                    </div>
                  </div>
                </div>

                {/* Impact Goal */}
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-400 mb-2">Environmental Impact</h3>
                  <p className="text-muted-foreground">{selectedProject.impact}</p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Project Description</h3>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Project Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Start Date</h4>
                    <p className="text-muted-foreground">{selectedProject.startDate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Expected Completion</h4>
                    <p className="text-muted-foreground">{selectedProject.expectedCompletion}</p>
                  </div>
                </div>

                {/* Funding Details */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-3">Funding Details</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-400">{selectedProject.currentFunding}</p>
                      <p className="text-xs text-muted-foreground">Current Funding</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{selectedProject.fundingGoal}</p>
                      <p className="text-xs text-muted-foreground">Funding Goal</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{selectedProject.contributors}</p>
                      <p className="text-xs text-muted-foreground">Contributors</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                        style={{ 
                          width: `${(parseFloat(selectedProject.currentFunding.replace(/[$MK,]/g, '')) / parseFloat(selectedProject.fundingGoal.replace(/[$MK,]/g, ''))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Verification Score */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h3 className="font-semibold text-blue-400 mb-2">Community Verification Score</h3>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-blue-400">{selectedProject.verificationScore}%</div>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${selectedProject.verificationScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Based on community reviews and impact verification</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                    onClick={() => showComingSoon("Support Project")}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Support This Project (Coming Soon)
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Verify Impact")}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Impact (Coming Soon)
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => showComingSoon("Share Project")}
                    >
                      <Wind className="w-4 h-4 mr-2" />
                      Share Project (Coming Soon)
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