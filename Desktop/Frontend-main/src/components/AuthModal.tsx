import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Heart, Users } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) => {
  const [userType, setUserType] = useState<"donor" | "receiver">("donor");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Welcome to Mealink
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Login to your account</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full bg-gradient-primary hover:shadow-food">
                  Sign In
                </Button>
                <Button variant="outline" className="w-full">
                  Forgot Password?
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button
                variant={userType === "donor" ? "foodie" : "outline"}
                onClick={() => setUserType("donor")}
                className="h-auto py-3 flex-col"
              >
                <Heart className="w-5 h-5 mb-1" />
                <span className="text-xs">Food Donor</span>
              </Button>
              <Button
                variant={userType === "receiver" ? "fresh" : "outline"}
                onClick={() => setUserType("receiver")}
                className="h-auto py-3 flex-col"
              >
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">Food Receiver</span>
              </Button>
            </div>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Create your account</CardTitle>
                <CardDescription>
                  Join the fight against food waste and hunger
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">
                    {userType === "donor" ? "Organization/Restaurant Name" : "Organization/Name"}
                  </Label>
                  <Input id="orgName" placeholder="Enter name" />
                </div>

                {userType === "donor" && (
                  <div className="space-y-2">
                    <Label htmlFor="orgType">Organization Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="cafe">Cafe</SelectItem>
                        <SelectItem value="hostel">Hostel</SelectItem>
                        <SelectItem value="catering">Catering Service</SelectItem>
                        <SelectItem value="canteen">Canteen</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {userType === "receiver" && (
                  <div className="space-y-2">
                    <Label htmlFor="receiverType">Receiver Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="shelter">Shelter</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="community">Community Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" placeholder="Contact person name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Full address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-food">
                  <Building className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;