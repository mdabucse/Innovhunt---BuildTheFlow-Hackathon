from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Load and prepare the data
data = pd.read_csv('products.csv')
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
    return df['name'].iloc[item_indices].tolist()

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    product_name = data.get('name')
    recommendations = get_recommendations(product_name)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
