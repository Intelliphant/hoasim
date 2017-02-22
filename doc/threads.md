#Simulation threads

The game will have a variety of simulation sub-systems that model events within the world. The systems are divided into two broad categories: local and regional.

The sub-system threads affect conditions within the neighborhood, making it easier or harder to achieve certain objectives.

##Local events

Local events include things such as weather, traffic, etc. which can affect property values and conditions directly. For example, grass will grow faster if it rains a lot this week.

##Regional events

Regional events could include things the regional economy. For example, if the economy is in a slump, it can cause home values to change unpredictably, or lower housing demand, resulting in fewer buyers for available properties.

Threads like the economy would run on a large-scale cycle (sine curve might be a good way to think of it), with random perturbations to the overall cycle to prevent it being too predictable.

Regional threads would have less impact on individual properties, but tend to have an impact over the long term.
