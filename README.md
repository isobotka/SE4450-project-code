# SE4450-project-code
 
## Preprocessing
- Contains the code which will organize input data into pairs and then crop and translate these images to create more training data.

## GUI
- Contains the code which will form the user interface, allowing for uploading of data, interfacing with MATLAB (if necassary), and easily viewing strain imaging.

## Machine Learning
- Contains references to methods used and research about potential algorithims for image scanning. Further has information about programming the GPU in order to train the future algorithims. 

## Python Enviroment Set-up
- Step 1: Install Anaconda with python version 3.7 (this version works with tensorflow).
- Step 2: within the python notebook use the command "pip install X" to install pandas, numpy, transformations, random, sklearn and scipy.
- Step 3: From the Anaconda Navigator UI go to envrioments and install tensorflow and keras through it, this option will prove much easier than trying to do so with a pip install or conda install.
- That should be all the required dependencies for PreprocessinRF.ipynb and Predictor.py