import sys
import json

# Get input arguments
location = sys.argv[1]
description = sys.argv[2]

# Call the prediction function
result = predict_snakes(location, description)

# Print the result in JSON format
print(json.dumps(result))
