# Quiz Round Breakdown

## How Rounds Are Generated

The quiz uses a **dynamic 4-round system** that automatically generates rounds from the style library to ensure all 12 target styles are represented consistently across all spaces.

## Dynamic Round Structure

The dynamic generator divides the 12 target styles evenly across 4 rounds:

### Round 1 (Prompt: "Which look pulls you in?")
- **Transitional**
- **Organic Modern** 
- **Japandi**

### Round 2 (Prompt: "Which space feels right?")
- **Wabi-Sabi**
- **Modern Mediterranean**
- **Scandinavian**

### Round 3 (Prompt: "Which direction resonates?")
- **Art Deco Revival**
- **Eclectic Maximalism**
- **Soft Industrial**

### Round 4 (Prompt: "Which would you live with every day?")
- **Coastal Calm**
- **Modern Farmhouse**
- **Desert Modern**

---

## Notes

- The dynamic generator ensures consistent style coverage regardless of space selected
- All 12 target styles are represented exactly once across the 4 rounds
- The dynamic generator pulls images from each style's `finalImages` array in the `styleLibrary`
- This system works uniformly across all 6 space types (Living Room, Bedroom, Kitchen, Bathroom, Office, Whole Home)
