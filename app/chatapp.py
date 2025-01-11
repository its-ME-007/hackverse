import os
from flask import Flask, request, jsonify, render_template
from groclake.vectorlake import VectorLake
from groclake.datalake import DataLake
from groclake.modellake import ModelLake

# Flask App
app = Flask(__name__)

# Set API key and account ID
GROCLAKE_API_KEY = '6974ce5ac660610b44d9b9fed0ff9548'
GROCLAKE_ACCOUNT_ID = 'e991fdd1385aee014e253a2937aa76f5'

# Set environment variables
os.environ['GROCLAKE_API_KEY'] = GROCLAKE_API_KEY
os.environ['GROCLAKE_ACCOUNT_ID'] = GROCLAKE_ACCOUNT_ID

# Initialize components
vectorlake = VectorLake()
datalake = DataLake()
modellake = ModelLake()

# Global variables to store IDs
datalake_id = None
vectorlake_id = None

def upload_document():
    """Upload a document to DataLake and process it for VectorLake."""
    global datalake_id, vectorlake_id

    try:
        # Step 1: Create DataLake and VectorLake if not already created
        if not datalake_id:
            datalake_create = datalake.create()
            if "datalake_id" in datalake_create:
                datalake_id = datalake_create["datalake_id"]
                print(f"DataLake created with ID: {datalake_id}")
            else:
                print(f"Error creating DataLake: {datalake_create}")
                return jsonify({"error": "Failed to create DataLake"}), 500
        
        if not vectorlake_id:
            vector_create = vectorlake.create()
            if "vectorlake_id" in vector_create:
                vectorlake_id = vector_create["vectorlake_id"]
                print(f"VectorLake created with ID: {vectorlake_id}")
            else:
                print(f"Error creating VectorLake: {vector_create}")
                return jsonify({"error": "Failed to create VectorLake"}), 500

        # Step 2: Get document URL from request
        document_url = "https://drive.google.com/uc?export=download&id=1MhbmMVLpIKPrAEhJoaFSWJ4REiI4jZeB"

        # Step 3: Push the document to DataLake
        payload_push = {
            "datalake_id": datalake_id,
            "document_type": "url",
            "document_data": document_url
        }
        data_push = datalake.push(payload_push)
        document_id = data_push.get("document_id")
        if not document_id:
            return jsonify({"error": "Failed to push document."}), 500

        print(f"Document pushed successfully with ID: {document_id}")

        # Step 4: Fetch and process the document
        payload_fetch = {
            "document_id": document_id,
            "datalake_id": datalake_id,
            "fetch_format": "chunk",
            "chunk_size": "500"
        }
        data_fetch = datalake.fetch(payload_fetch)
        document_chunks = data_fetch.get("document_data", [])
        print(f"Document fetched successfully. Total chunks: {len(document_chunks)}")

        # Step 5: Push chunks to VectorLake
        for chunk in document_chunks:
            vector_doc = vectorlake.generate(chunk)
            vector_chunk = vector_doc.get("vector")
            vectorlake_push_request = {
                "vector": vector_chunk,
                "vectorlake_id": vectorlake_id,
                "document_text": chunk,
                "vector_type": "text",
                "metadata": {}
            }
            vectorlake.push(vectorlake_push_request)

        return jsonify({"message": "Document processed successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def home():
    """Render the home page."""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint for processing user queries."""
    try:
        # Step 1: Get user query from request
        query = request.json.get("query")
        if not query:
            return jsonify({"error": "Query is required."}), 400

        # Step 2: Generate vector for the user query
        vector_search_data = vectorlake.generate(query)
        search_vector = vector_search_data.get("vector")

        # Step 3: Search VectorLake
        search_payload = {
            "vector": search_vector,
            "vectorlake_id": vectorlake_id,
            "vector_type": "text",
        }
        search_response = vectorlake.search(search_payload)
        
        # Print the search response for debugging
        print("Search Response:", search_response)

        search_results = search_response.get("results", [])
        
        # Step 4: Construct enriched context
        enriched_context = " ".join([result.get("vector_document", "") for result in search_results])

        # Step 5: Query ModelLake with enriched context
        payload = {
            "messages": [
                {"role": "system", "content": "You are a pharmacist working at a jan aushadhi kendra. refer the doc given "},
                {
                    "role": "user",
                    "content": f"Using the following context: {enriched_context}, "
                               f"answer the question: {query}."
                }
            ]
        }
        chat_response = modellake.chat_complete(payload)
        answer = chat_response.get("answer", "No answer received.")
        return jsonify({"answer": answer}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    with app.app_context():    
        upload_document()
    app.run(host='0.0.0.0', port=5000)