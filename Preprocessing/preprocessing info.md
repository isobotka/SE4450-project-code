# Information Tracking for Preprocessing Code

## Assumptions
### Cropping
Crop BMODE image boundaries such that the scales are removed and translations can be applied to create more training data
* Image Pixel Boundaries (Inclusive, leaves one pixel of whitespace around the image)
    - Top Left: 95,54
    - Top Right: 670, 54
    - Bottom Left: 95, 670
    - Bottom Right: 670, 670

### IO
- Input: Folder of BMODE images
- Output: Pairs and conditional on boolean, extra translated pairs into organized folder
