# odbRead.py
# A script to read the ABAQUS/CAE Visualization module tutorial
# output database and read displacement data from the node at 
# the center of the hemispherical punch.

from odbAccess import *
import sys

# Check that an output database was specified.

if len(sys.argv) != 2:
    #print 'Error: you must supply the name of an odb on the command line'
    sys.exit(1)

# Get the command line argument.

odbPath = sys.argv[1]

# Open the output database.

odb = openOdb(path=odbPath)
#odb = openOdb(path='newtest.odb')

# Create a variable that refers to the
# last frame of the first step.

lastFrame = odb.steps['Step-1'].frames[-1]

# Create a variable that refers to the displacement 'U'
# in the last frame of the first step.

displacement = lastFrame.fieldOutputs['U']

# Create a variable that refers to the displacement values'.

fieldValues=displacement.values

# For each displacement value, print the nodeLabel
# and data members.

f = open('displacement.txt','w')

for v in fieldValues:
    print >>f, '%d %4.4f %4.4f' % (v.nodeLabel, v.data[0], v.data[1])

##############

field = lastFrame.fieldOutputs['S']

stress = field.getSubset(position=CENTROID, elementType = 'CPE4R')

fieldValues=stress.values

g = open('stress.txt','w')

for v in fieldValues:
    print >>g, '%d %2.8f %2.8f %2.8f %2.8f' % (v.elementLabel, v.data[0], v.data[1], v.data[2], v.data[3])

##############

#field = lastFrame.fieldOutputs['E']

#strain = field.getSubset(position=CENTROID, elementType = 'CPE4R')

#fieldValues=strain.values

#g = open('strain.txt','w')

#for v in fieldValues:
    #print >>g, '%d %1.10f %1.10f %1.10f %1.10f' % (v.elementLabel, v.data[0], v.data[1], v.data[2], v.data[3])

##############
