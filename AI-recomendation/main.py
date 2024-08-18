import os
from supabase import create_client, Client
import csv
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import streamlit as st


def get_data():
    url: str = 'https://gnitckonbzlnwzrsbufs.supabase.co'
    key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaXRja29uYnpsbnd6cnNidWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNTEzNDgsImV4cCI6MjAzMDcyNzM0OH0.OzjVgoMRTbDTLOY0Wvu_Ewun05-oJkszrTXkEpP_WDY'
    supabase: Client = create_client(url, key)

    response = supabase.table('products').select('*').execute()

    if response.data:
        name = []
        description = []
        slogan = []

        for i in response.data:
            name.append(i['name'])
            description.append(i['description'])
            slogan.append(i['slogan'])

        with open('products.csv', 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['name', 'description', 'slogan']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for i in range(len(name)):
                writer.writerow({'name': name[i], 'description': description[i], 'slogan': slogan[i]})

        print("CSV file created successfully.")
    else:
        print("No data found")

get_data()
data = pd.read_csv('A:\Projects\InnoHunt\Recom\products.csv')
df = pd.DataFrame(data)
df['combined_features'] = df['name'] + " " + df['description'] + " " + df['slogan']
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['combined_features'])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)


def get_recommendations(name, cosine_sim=cosine_sim):
    idx = df.index[df['name'] == name].tolist()[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]
    item_indices = [i[0] for i in sim_scores]
    return df['name'].iloc[item_indices]

def find_result(value):
    try:
        result=get_recommendations(value)
        return result
    except Exception as e:
        print(print(e))

if __name__ =='__main__':
    options = ['summa']
    for i in data['name']:
        options.append(i)
    selected_option = st.selectbox('Select an option:', options)
    st.write(find_result(selected_option))


