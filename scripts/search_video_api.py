with open("flow_frontend.js", "r", encoding="utf-8") as f:
    js = f.read()

import re

# Look for occurrences of "/video" or "shared"
matches = [m.start() for m in re.finditer(r'shared/video', js, re.IGNORECASE)]
print("Matches for shared/video in js:", len(matches))
for pos in matches:
    print(js[max(0, pos-200):min(len(js), pos+300)])
    print("-" * 50)

# Look for endpoints or fetch calls or xmlhttprequests
reqs = re.findall(r'(?:fetch|\.get|\.post)\([^\)]+\)', js)
print("Fetch/get/post count:", len(reqs))
for r in reqs[:10]:
    print("REQ:", r[:150])
