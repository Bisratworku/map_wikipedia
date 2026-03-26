import wikipedia


u = wikipedia.page("teddy afro")
for idx,i in enumerate(u.links):
    try:
        link = wikipedia.page(i)
    except:
        continue
    #lonk = link.links
    #summ = link.summary
    img = link.images
    print(f'------------- {idx} ----------------')
    #print(img.endswith('.jpg'))
    
