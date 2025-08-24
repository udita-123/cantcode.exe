import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReceiveFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReceiveForm = ({ isOpen, onClose }: ReceiveFormProps) => {
  const { toast } = useToast();
  const [mealType, setMealType] = useState("");
  const [urgency, setUrgency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Food Request Submitted!",
      description: "We're connecting you with nearby food donors.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            <span className="bg-gradient-fresh bg-clip-text text-transparent">
              Request Food
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meal Type */}
              <div className="space-y-2">
                <Label htmlFor="mealType">Preferred Meal Type</Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-warning text-white">Breakfast</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="lunch">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-white">Lunch</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="dinner">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-secondary text-white">Dinner</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="any">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Any Meal</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of People */}
              <div className="space-y-2">
                <Label htmlFor="peopleCount">Number of People to Feed</Label>
                <Input id="peopleCount" type="number" placeholder="e.g., 25" min="1" />
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant={urgency === "low" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setUrgency("low")}
                  >
                    🟢 Low
                  </Button>
                  <Button
                    type="button"
                    variant={urgency === "medium" ? "egg" : "outline"}
                    size="sm"
                    onClick={() => setUrgency("medium")}
                  >
                    🟡 Medium
                  </Button>
                  <Button
                    type="button"
                    variant={urgency === "high" ? "non-veg" : "outline"}
                    size="sm"
                    onClick={() => setUrgency("high")}
                  >
                    🔴 High
                  </Button>
                </div>
              </div>

              {/* Food Preferences */}
              <div className="space-y-2">
                <Label htmlFor="preferences">Food Preferences (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any dietary preferences?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">No Preference</SelectItem>
                    <SelectItem value="veg">Vegetarian Only</SelectItem>
                    <SelectItem value="non-veg">Non-Vegetarian Okay</SelectItem>
                    <SelectItem value="no-beef">No Beef</SelectItem>
                    <SelectItem value="no-pork">No Pork</SelectItem>
                    <SelectItem value="halal">Halal Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Pickup/Delivery Time</Label>
                <Input id="preferredTime" type="time" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Delivery Option */}
              <div className="space-y-2">
                <Label>Delivery Option</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" size="sm">
                    🚗 We'll Pick Up
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    🚚 Request Delivery
                  </Button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <div className="flex gap-2">
                  <Input id="location" placeholder="Enter your address" className="flex-1" />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Contact person name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific requirements, location details, or other information..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-fresh hover:shadow-food">
              <Users className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveForm;