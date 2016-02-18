Notes on JQuery action

Offset property returns left and top coordinates, and can be used to set left and top coordinates of new option.

Z-index determines order; when auto, takes index of parent. So theoretically you could just walk up the parent chain until you get a numeric value. Might want to confirm this.

So, for each element:

1. Get position
2. Get z-index.
3a-c (may be unnecessary) a. Create basic box HTML including content
b. Add box to bottom of dom, currently hidden.
c. Position element absolutely using offset coordinates with slight adjustment
d. Give element z-index that is one higher than existing element


