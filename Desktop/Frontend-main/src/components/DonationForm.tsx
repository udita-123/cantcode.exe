import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Package, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FoodCategoryBadge from "./FoodCategoryBadge";

interface DonationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationForm = ({ isOpen, onClose }: DonationFormProps) => {
  const { toast } = useToast();
  const [foodItems, setFoodItems] = useState<string[]>([""]);
  const [mealType, setMealType] = useState("");
  const [foodCategory, setFoodCategory] = useState<"veg" | "non-veg" | "egg">("veg");

  const addFoodItem = () => {
    setFoodItems([...foodItems, ""]);
  };

  const removeFoodItem = (index: number) => {
    if (foodItems.length > 1) {
      setFoodItems(foodItems.filter((_, i) => i !== index));
    }
  };

  const updateFoodItem = (index: number, value: string) => {
    const updated = [...foodItems];
    updated[index] = value;
    setFoodItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donation Listed Successfully!",
      description: "Your food donation has been added to today's donor list.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Donate Food
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Food Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meal Type */}
              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
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
                  </SelectContent>
                </Select>
              </div>

              {/* Food Category */}
              <div className="space-y-2">
                <Label>Food Category</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={foodCategory === "veg" ? "veg" : "outline"}
                    size="sm"
                    onClick={() => setFoodCategory("veg")}
                  >
                    🟢 Veg
                  </Button>
                  <Button
                    type="button"
                    variant={foodCategory === "non-veg" ? "non-veg" : "outline"}
                    size="sm"
                    onClick={() => setFoodCategory("non-veg")}
                  >
                    🔴 Non-Veg
                  </Button>
                  <Button
                    type="button"
                    variant={foodCategory === "egg" ? "egg" : "outline"}
                    size="sm"
                    onClick={() => setFoodCategory("egg")}
                  >
                    🟡 Egg
                  </Button>
                </div>
              </div>

              {/* Food Items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Food Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFoodItem}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                {foodItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateFoodItem(index, e.target.value)}
                      placeholder={`Food item ${index + 1}`}
                    />
                    {foodItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFoodItem(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Quantity & Packets */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Total Quantity</Label>
                  <Input id="quantity" placeholder="e.g., 5 kg or 10 liters" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packets">Number of Packets</Label>
                  <Input id="packets" type="number" placeholder="e.g., 20" />
                </div>
              </div>

              {/* Preparation Time */}
              <div className="space-y-2">
                <Label htmlFor="prepTime">Food Prepared Time</Label>
                <Input id="prepTime" type="time" />
              </div>

              {/* Available Until */}
              <div className="space-y-2">
                <Label htmlFor="availableUntil">Available Until</Label>
                <Input id="availableUntil" type="time" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pickup Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <div className="flex gap-2">
                  <Input id="location" placeholder="Enter pickup address" className="flex-1" />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea 
                  id="instructions" 
                  placeholder="Any special handling instructions, dietary information, or notes for pickup..."
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
            <Button type="submit" className="flex-1 bg-gradient-primary hover:shadow-food">
              <Package className="w-4 h-4 mr-2" />
              List Donation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationForm;