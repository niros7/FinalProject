import spacy
nlp = spacy.load('en')



doc = nlp(u'Israel, New York, Germany')

for ent in doc.ents:
    print(ent.text, ent.start_char, ent.end_char, ent.label_)
