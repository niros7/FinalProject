import spacy

nlp = spacy.load('en')


def extract_locations(text):
    doc = nlp(text)
    labels = [{'Text': ent.text, 'Label': ent.label_} for ent in doc.ents if ent.label_ in ['GPE']]
    return labels


def parse_trip_steps(steps):
    labels = []
    for step in steps:
        labels.append([tag for tag in extract_locations(step["Content"]) if tag['Text'].isspace() is False])

    return labels
